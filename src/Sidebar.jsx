import React, { useState } from "react";
import { LuHome } from "react-icons/lu";
import "./index.css";
import { LuHardDrive } from "react-icons/lu";
import { MdOutlineMonitor } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { PiWarningOctagon } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCloud } from "react-icons/ci";
import { Modal, Box } from "@mui/material";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "./firebase";



function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  }

 async function handleUpload(event) {
   event.preventDefault();
  //  setUploading(true);
  
  //  storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
  //   console.log(snapshot);
  //  })
  
  if (!file) return;

  setUploading(true);

  try {
      const fileRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      // console.log(snapshot);

      const url = await getDownloadURL(fileRef);

      await addDoc(collection(db, "myFiles"), {
          timestamp: serverTimestamp(),
          filename: file.name,
          fileURL: url,
          size: file.size,
      });

      setUploading(false);
      setFile(null);
      setOpen(false);
  } catch (error) {
      console.error("Error uploading file: ", error);
      setUploading(false);
  }


  }

 

  // async function handleUpload() {
  //     if (!file) return;

  //     setUploading(true);

  //     try {
  //         const fileRef = ref(storage, `files/${file.name}`);
  //         const snapshot = await uploadBytes(fileRef, file);
  //         console.log(snapshot);

  //         const url = await getDownloadURL(fileRef);

  //         await addDoc(collection(db, "myFiles"), {
  //             timestamp: serverTimestamp(),
  //             filename: file.name,
  //             fileURL: url,
  //             size: file.size,
  //         });

  //         setUploading(false);
  //         setFile(null);
  //         setOpen(false);
  //     } catch (error) {
  //         console.error("Error uploading file: ", error);
  //         setUploading(false);
  //     }
  // }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          outline: "none",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "start",
            backgroundColor: "white",
            width: "40%",
            padding: 5,
            borderRadius: 2,
            boxShadow: 24,
            outline: "none",
            border: "none",
          }}
        >
          <div className="relative w-full ">
            <p className="font-semibold mb-3 text-center text-xl">
              Select file you want to upload
            </p>
            <button
              className="absolute top-0 right-0"
              onClick={() => setOpen(false)}
            >
              {/* <CloseIcon /> */}
            </button>
          </div>

          <div className="text-center ml-auto mr-auto ">
            <input
              onChange={handleFile}
              className="bg-white border-0 outline-dotted p-7 "
              type="file"
            />
          </div>
          {uploading ? (
            <input
              className="px-5 py-2 rounded-lg  bg-[#315ebe]  text-white font-semibold mt-4 w-[100%]"
              value="Uploading..."
              disabled
              type="submit"
            />
          ) : (
            <input
              onClick={handleUpload}
              className="hover-transition px-5 py-2 rounded-lg cursor-pointer bg-[#315ebe] hover:bg-[#282f3c] w-[100%] mt-4 text-white font-semibold"
              value="Upload"
              type="submit"
            />
          )}
        </Box>
      </Modal>

      <div className="main w-[15vw] flex flex-col justify-center gap-3 text-l px-3 mt-4 font-sans font-medium   ">
        <button
          onClick={() => setOpen(true)}
          className="shadow-xl   rounded-xl text-xl p-3 ml-4 mt-2"
        >
          <span>+</span> <span>New</span>{" "}
        </button>
        <div className="sub-1 flex flex-col ">
          <div className="flex items-center gap-2 bg-[#DBEAFE] rounded-full px-2 py-2">
            <LuHome />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2  hover:bg-[#E2E8F0] rounded-full">
            <LuHardDrive />
            <span>My Drive</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <MdOutlineMonitor />
            <span>Computers</span>
          </div>
        </div>

        <div className="sub-2 flex flex-col  ">
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <MdOutlinePeopleAlt />
            <span>Share with me</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <FaRegClock />
            <span>Recent</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <FaRegStar />
            <span>Starred</span>
          </div>
        </div>

        <div className="sub-3 flex flex-col ">
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <PiWarningOctagon />
            <span>Spam</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <FaRegTrashAlt />
            <span>Trash</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full">
            <CiCloud />
            <span>Storage</span>
          </div>
        </div>
        <div className="mt-2 ml-2">
          <div className="bg-[#C9CDD2]  w-[85%] rounded-full">
            <div className=" rounded-full  bg-[#2196F3] p-1 w-[10%]"></div>
          </div>
          <p>20 Bytes of 100MB</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
