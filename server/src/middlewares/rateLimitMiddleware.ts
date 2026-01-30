import { Request, Response, NextFunction } from "express";

const requests = new Map();

export function rateLimite(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;

  const now = Date.now();

  const limit = 5;
  const windows = 60 * 1000; //1 minuto

  //se for primeira tentativa
  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, startTime: now });
    return next();
  }

  const data = requests.get(ip);

  //se ja passou 1 min reseta
  if (now - data.startTime > windows) {
    requests.set(ip, { count: 1, startTime: now });
    return next();
  }

  //se excedeu o limite
  if (data.count >= limit) {
    return res.status(429).json({
      message: "Muitas requisições. Tente novamente em alguns segundos.",
    });
  }

  //incrmenta o contador
  data.count++;
  requests.set(ip, data);

  next();
}
