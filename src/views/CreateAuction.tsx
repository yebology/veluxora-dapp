import { useState } from "react";
import { pinata } from "../global/pinata";

export const CreateAuction = (docs: File) => {
    
  const uploadFile = async () => {
    try {
      return (
        "https://gateway.pinata.cloud/" +
        (await pinata.upload.public.file(docs)).cid
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const uploadLuxuryCarMetadata = async () => {
    try {
      const file = await pinata.upload.public.json({
        name: name,
        image: image,
        description: description,
        vehicle: {
          plateNumber: plateNumber,
          brand: brand,
          model: model,
          year: parseInt(year),
          color: color,
        },
        stnk: {
          number: stnkNumber,
          issuedBy: stnkIssuedBy,
          issuedDate: stnkIssuedDate,
          validUntil: stnkValidUntil,
          encryptedFileUrl: stnkEncryptedFileUrl,
        },
        bpkb: {
          number: bpkbNumber,
          issuedBy: bpkbIssuedBy,
          issuedDate: bpkbIssuedDate,
          encryptedFileUrl: bpkbEncryptedFileUrl,
        },
      });
      return "https://gateway.pinata.cloud/" + file.cid;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const [plateNumber, setPlateNumber] = useState("")
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [color, setColor] = useState("")

  const [stnkNumber, setStnkNumber] = useState("")
  const [stnkIssuedBy, setStnkIssuedBy] = useState("")
  const [stnkIssuedDate, setStnkIssuedDate] = useState("")
  const [stnkValidUntil, setStnkValidUntil] = useState("")
  const [stnkEncryptedFileUrl, setStnkEncryptedFileUrl] = useState("")
  
  const [bpkbNumber, setBpkbNumber] = useState("")
  const [bpkbIssuedBy, setBpkbIssuedBy] = useState("")
  const [bpkbIssuedDate, setBpkbIssuedDate] = useState("")
  const [bpkbEncryptedFileUrl, setBpkbEncryptedFileUrl] = useState("")

  return (
    <div>
      <div>aaaa</div>
    </div>
  );
};
