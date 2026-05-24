import multer from "multer";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "./public/temp");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "");

        cb(null, uniqueName);
    }
});

export const upload = multer({

    storage,

    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    }
});