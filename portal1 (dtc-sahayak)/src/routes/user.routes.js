import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";

// Import middleware
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// User Routes
router.route("/register").post(
    // Using middleware
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);


router.get("/login", (req, res) => {
    res.render("login.ejs");  // Renders src/views/man.profile.ejs
});
// Routes for Manager Views
router.get("/man/profile", (req, res) => {
    res.render("man.profile.ejs");  // Renders src/views/man.profile.ejs
});

router.get("/man/temp", (req, res) => {
    res.render("man.temp.ejs");  // Renders src/views/man.temp.ejs
});

router.get("/man/dashboard", (req, res) => {
    res.render("man1.dashboard.ejs");  // Renders src/views/man1.dashboard.ejs
});

router.get("/man/available", (req, res) => {
    res.render("man2.available.ejs");  // Renders src/views/man2.available.ejs
});

router.get("/man/scheduletrips", (req, res) => {
    res.render("man3.scheduletrips.ejs");  // Renders src/views/man3.scheduletrips.ejs
});

router.get("/man/linked", (req, res) => {
    res.render("man4.linked.ejs");  // Renders src/views/man4.linked.ejs
});

router.get("/man/addemp", (req, res) => {
    res.render("man5.addemp.ejs");  // Renders src/views/man5.addemp.ejs
});

router.get("/man/employeereq", (req, res) => {
    res.render("man6.employeereq.ejs");  // Renders src/views/man6.employeereq.ejs
});

// Routes for Scheduler Views
router.get("/sch/profile", (req, res) => {
    res.render("sch.profile.ejs");  // Renders src/views/sch.profile.ejs
});

router.get("/sch/dashboard", (req, res) => {
    res.render("sch1.dashboard.ejs");  // Renders src/views/sch1.dashboard.ejs
});

router.get("/sch/linked", (req, res) => {
    res.render("sch2.linked.ejs");  // Renders src/views/sch2.linked.ejs
});

router.get("/sch/routestatus", (req, res) => {
    res.render("sch3.routestatus.ejs");  // Renders src/views/sch3.routestatus.ejs
});

router.get("/sch/scheduleduty", (req, res) => {
    res.render("sch4.scheduleduty.ejs");  // Renders src/views/sch4.scheduleduty.ejs
});

router.get("/sch/scheduledtrips", (req, res) => {
    res.render("sch5.scheduledtrips.ejs");  // Renders src/views/sch5.scheduledtrips.ejs
});

router.get("/sch/crew", (req, res) => {
    res.render("sch6.crew.ejs");  // Renders src/views/sch6.crew.ejs
});

export default router;
