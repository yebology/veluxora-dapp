import { pinata } from "../global/pinata";

export const CreateAuction = (docs: File) => {
    
  const uploadFile = async () => {
    try {
      return (
        "https://gateway.pinata.cloud/" +
        (await pinata.upload.file(docs)).IpfsHash
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const uploadLuxuryCarMetadata = async () => {
    try {
      const file = await pinata.upload.json({
        name: "",
        image: "",
        description: "",
        vehicle: {
          plateNumber: "",
          brand: "",
          model: "",
          year: 0,
          color: "",
        },
        stnk: {
          number: 0,
          issuedBy: "",
          issuedDate: "",
          validUntil: "",
          encryptedFileUrl: "",
        },
        bpkb: {
          number: 0,
          issuedBy: "",
          issuedDate: "",
          encryptedFileUrl: "",
        },
      });
      return "https://gateway.pinata.cloud/" + file.IpfsHash;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div>aaaa</div>
    </div>
  );
};
