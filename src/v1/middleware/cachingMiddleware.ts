import { Request, Response, NextFunction } from "express";
import cache from "../utils/cacheUtils";

const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user_id: number | undefined = req.user?.user_id;
  if (user_id === undefined || isNaN(user_id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const key: string = req.originalUrl + user_id;

  const cachedData = cache.get(key) as string;
  if (cachedData) {
    let parsedCachedData;
    try {
      parsedCachedData = JSON.parse(cachedData);
    } catch (error) {
      parsedCachedData = cachedData;
    }
    return res.status(200).json(parsedCachedData);
  }

  const originalSend = res.send.bind(res);

  res.send = ((body: any) => {
    cache.set(key, body, 60);
    originalSend(body);
  }) as any;

  next();
};

const clearCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id: number | undefined = req.user?.user_id;
  if (user_id === undefined || isNaN(user_id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const key: string = req.originalUrl + user_id;

  if (cache.has(key)) {
    cache.flushAll();
    console.log("Cache cleared!");
  }

  next();
};

export { cacheMiddleware, clearCacheMiddleware };
