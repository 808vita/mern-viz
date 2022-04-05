const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		// const userId = req.user.id;

		// const user = await User.findById(userId).select("-password"); //then here we will fetch "that user all data from mongo db expecpt password by the help of id"

		// res.send(user);
		res.send("serve all data from monogodb here");
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Occured");
	}
});

module.exports = router;
