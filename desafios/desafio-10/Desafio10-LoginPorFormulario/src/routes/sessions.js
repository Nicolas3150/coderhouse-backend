import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const sessions = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authMiddleware = (req, res, next) => {
  req.session.username ? next() : res.redirect("/login");
};

const loginMiddleware = (req, res, next) => {
  req.session.username ? res.redirect("/") : next();
};

sessions.post("/login", (req, res) => {
  try {
    const { username } = req.body;
    req.session.username = username;
    res.redirect("/");
  } catch (err) {
    res.json({ error: true, message: err });
  }
});

sessions.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/home.html"));
});

sessions.get("/user", authMiddleware, (req, res) => {
  res.json(req.session.username);
});

sessions.get("/login", loginMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});


sessions.get("/logout", authMiddleware, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ error: true, body: err });
    }
  });
});

export default sessions;
