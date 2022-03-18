export const convertImageToBase64 = (fileObj: any) => {
    try {
        const file = fileObj.img;
        const newImg = file.data.toString('base64');
        return {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(newImg, 'base64')
        };
    } catch (error) {
        throw new Error("Error");

    }
}