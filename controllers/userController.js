const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const imagekit = require("../libs/imageKit");

class UserControllers{ 
    static async addUser(req,res){
        try {
            const {name, email, imageId} = req.body;
    
            const userAdd = await prisma.user.create({
                data: {
                    name,
                    email,
                    imageId: +imageId
                }
            })
            res.status(201).json({
                message: "User added successfully",
                data: userAdd
            })
            
        } catch (error) {
            console.log("ini error dari userController ===> ",error);
            res.status(500).json({
                message: error
            })
        }
    }

    static async addImage(req, res){
        try {
            let stringFile = req.file.buffer.toString("base64");
            
            if(!res.file || req.length === 0){
                res.status(400).json({
                    message: "Bad Request",
                    error: "File not found"
                })
            }
            const { title, description } = req.body;

            const uploadImage= await imagekit.upload({
                file: stringFile,
                fileName: req.file.originalname
            })
            // console.log("uploadImage ==>>", uploadImage);
            if(!uploadImage){
                res.status(400).json({
                    message: "Bad Request"
                })
            }

            const imageAdd = await prisma.image.create({
                data: {
                    title: title, // Gunakan title yang diberikan atau default 'Default Title'
                    description: description || '',
                    profileImageUrl: uploadImage.url,
                    imageFileId: uploadImage.fileId
                }
            })
            console.log("imageAdd ==>>", imageAdd);
            
            res.status(201).json(imageAdd)
        } catch (error) {
            console.log(error, "ini error dari userController");
            // res.status(500).json(error)
            
        }
    }

    static async getAllImages(req, res) {
        try {
            const images = await prisma.image.findMany();
            if (images.length === 0) {
                res.status(404).json({
                    message: "No images found"
                });
            } else {
                const activeImages = images.filter(image => image.isActive);
                if (activeImages.length === 0) {
                    res.status(404).json({
                        message: "No active images found"
                    });
                }
                res.status(200).json(activeImages);
            }
            // res.status(200).json(images);
        } catch (error) {
            console.log("Error fetching images: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    static async getImagesById(req, res) {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: +id
                }
            });
            if (!image) {
                res.status(404).json({
                    message: `Image with id ${id} not found`
                });
            } else {
                if (!image.isActive) {
                    res.status(404).json({
                        message: `Image with id ${id} not found`
                    });
                }
                res.status(200).json(image);
            }
        } catch (error) {
            console.log("Error fetching image: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    static async hardDeleteImageById(req, res) {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!image) {
                res.status(404).json({
                    message: `Image with id ${id} not found`
                });
            } else {
                await imagekit.deleteFile(image.imageFileId);
                await prisma.image.delete({
                    where: {
                        id: parseInt(id)
                    }
                });
                await prisma.user.delete({
                    where: {
                        imageId: parseInt(id)
                    }
                })
                res.status(200).json({
                    message: `Image with id ${id} deleted successfully`
                });
            }
        } catch (error) {
            console.log("Error deleting image: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    static async softDeleteImageById(req, res) {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!image) {
                res.status(404).json({
                    message: `Image with id ${id} not found`
                });
            } else {
                await prisma.image.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        isActive: false
                    }
                });
                await prisma.user.updateMany({
                    where: {
                        imageId: parseInt(id)
                    },
                    data: {
                        isActive: false
                    }
                })
                res.status(200).json({
                    message: `Image with id ${id} deleted successfully`
                });
            }
        } catch (error) {
            console.log("Error deleting image: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    static async restoreImageById(req, res) {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!image) {
                res.status(404).json({
                    message: `Image with id ${id} not found`
                });
            } else {
                await prisma.image.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        isActive: true
                    }
                });
                await prisma.user.update({
                    where: {
                        imageId: parseInt(id)
                    },
                    data: {
                        isActive: true
                    }
                })
                res.status(200).json({
                    message: `Image with id ${id} restored successfully`
                });
            }
        } catch (error) {
            console.log("Error restoring image: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    // static async updateData(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { title, description } = req.body;

    //         const image = await prisma.image.findUnique({
    //             where: {
    //                 id: parseInt(id)
    //             }
    //         });

    //         if (!image) {
    //             return res.status(404).json({
    //                 message: `Image with id ${id} not found`
    //             });
    //         }

    //         const updatedImage = await prisma.image.update({
    //             where: {
    //                 id: parseInt(id)
    //             },
    //             data: {
    //                 title: title || image.title,
    //                 description: description || image.description
    //             }
    //         });

    //         res.status(200).json({
    //             message: `Image with id ${id} updated successfully`,
    //             data: updatedImage
    //         });
    //     } catch (error) {
    //         console.log("Error updating image: ", error);
    //         res.status(500).json({
    //             message: "Internal Server Error",
    //             error: error.message
    //         });
    //     }
    // }
    
    static async updateImageById(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const image = await prisma.image.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if (!image) {
                return res.status(404).json({
                    message: `Image with id ${id} not found`
                });
            }

            let stringFile = req.file.buffer.toString("base64");

            if (!req.file || req.file.length === 0) {
                return res.status(400).json({
                    message: "Bad Request",
                    error: "File not found"
                });
            }

            const uploadImage = await imagekit.upload({
                file: stringFile,
                fileName: req.file.originalname
            });

            if (!uploadImage) {
                return res.status(400).json({
                    message: "Bad Request"
                });
            }

            await imagekit.deleteFile(image.imageFileId);

            const updatedImage = await prisma.image.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title: title || image.title,
                    description: description || image.description,
                    profileImageUrl: uploadImage.url,
                    imageFileId: uploadImage.fileId
                }
            });

            res.status(200).json({
                message: `Image with id ${id} updated successfully`,
                data: updatedImage
            });
        } catch (error) {
            console.log("Error updating image: ", error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = UserControllers