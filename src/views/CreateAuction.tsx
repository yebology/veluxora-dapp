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
        attributes: [
          {
            trait_type: "Plate Number",
            value: plateNumber,
          },
          {
            trait_type: "Brand",
            value: brand,
          },
          {
            trait_type: "Model",
            value: model,
          },
          {
            trait_type: "Year",
            value: parseInt(year),
          },
          {
            trait_type: "Color",
            value: color,
          },
          {
            trait_type: "STNK Number",
            value: stnkNumber,
          },
          {
            trait_type: "STNK Issued By",
            value: stnkIssuedBy,
          },
          {
            trait_type: "STNK Issued Date",
            value: stnkIssuedDate,
          },
          {
            trait_type: "STNK Valid Until",
            value: stnkValidUntil,
          },
          {
            trait_type: "STNK File",
            value: stnkEncryptedFileUrl,
          },
          {
            trait_type: "BPKB Number",
            value: bpkbNumber,
          },
          {
            trait_type: "BPKB Issued By",
            value: bpkbIssuedBy,
          },
          {
            trait_type: "BPKB Issued Date",
            value: bpkbIssuedDate,
          },
          {
            trait_type: "BPKB File",
            value: bpkbEncryptedFileUrl,
          },
        ],
      });
      return "https://gateway.pinata.cloud/" + file.cid;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [plateNumber, setPlateNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");

  const [stnkNumber, setStnkNumber] = useState("");
  const [stnkIssuedBy, setStnkIssuedBy] = useState("");
  const [stnkIssuedDate, setStnkIssuedDate] = useState("");
  const [stnkValidUntil, setStnkValidUntil] = useState("");
  const [stnkEncryptedFileUrl, setStnkEncryptedFileUrl] = useState("");

  const [bpkbNumber, setBpkbNumber] = useState("");
  const [bpkbIssuedBy, setBpkbIssuedBy] = useState("");
  const [bpkbIssuedDate, setBpkbIssuedDate] = useState("");
  const [bpkbEncryptedFileUrl, setBpkbEncryptedFileUrl] = useState("");

  return (
    <div>
      <div>aaaa</div>
    </div>
  );
};
