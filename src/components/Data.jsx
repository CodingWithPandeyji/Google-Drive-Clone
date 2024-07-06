import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Preview from './Preview';

import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

function Data({ searchQuery, sortOption, setSize, setBytes, theme, setOpen, setHelp, setThemeMenu, setSortMenu }) {
    const [files, setFiles] = useState([]);
    const [view, setView] = useState("list");
    const [contextMenu, setContextMenu] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [preview, setPreview] = useState(false);
    const [command, setCommand] = useState("");
    const [fileName, setFileName] = useState("");
    // const [filteredCommand, setFilteredCommand] = useState([]);
    
    const commands = ["upload a file", "see help", "change theme", "preview a file", "sort the files", "change the view"];

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "myFiles"), snapshot => {
            const filesData = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));

            setFiles(filesData);

            // Calculate the total size
            const totalSize = filesData.reduce((acc, file) => acc + file.data.size, 0);
            setBytes(totalSize);
            setSize(changeBytes(totalSize));
        });

        return () => unsubscribe();
    }, [setSize]);

    useEffect(() => {
        let filteredCommand = [];
        if (command.trim() === "") {
            return; 
        }
    
        if (command !== "") {
            filteredCommand = commands.filter(cmd => {
                const cmdWords = cmd.split(" "); 
                const inputWords = command.split(" "); 
    
                
                return cmdWords.every(word => inputWords.includes(word));
            });
        }
    
        if (command !== "" && filteredCommand.length !== 1) {
            alert("Command not recognized. Kindly try again!");
        } 
        else {
            if (filteredCommand[0] === 'upload a file') {
                setOpen(true);
            } 
            else if (filteredCommand[0] === 'see help') {
                setHelp(true);
            } 
            else if(filteredCommand[0] === 'change theme') {
                setThemeMenu(true);
            }
            else if(filteredCommand[0] === 'preview a file') {
                setPreview(true);
            }
            else if(filteredCommand[0] === 'sort the files') {
                setSortMenu(true);
            }
            else if(filteredCommand[0] === 'change the view') {
                if(view === 'list') {
                    setView('grid');
                }
                else {
                    setView('list');
                }
            }
        }
    
    
        setCommand("");
    }, [command, commands, setOpen, setHelp]);    

    function changeBytes(bytes, decimals = 2) {
        if (bytes === 0) {
            return '0 Bytes';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", 'MB', "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const handleContextMenu = (event, file) => {
        event.preventDefault();
        console.log("clicked");
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            file,
        });
        setFileName(file.data.filename);
        console.log(contextMenu);
        console.log(file);
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = async (file) => {
        await deleteDoc(doc(db, "myFiles", file.id));
    };

    const handleCopyLink = (fileURL) => {
        navigator.clipboard.writeText(fileURL).then(() => {
            alert("Link copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy link: ", err);
        });
    };

    const handleDownload = (fileURL) => {
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePreview = (file) => {
        setPreviewFile(file);
    };

    const filteredFiles = files.filter(file =>
        file.data.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFiles = filteredFiles.sort((a, b) => {
        switch (sortOption) {
            case 'name_asc':
                return a.data.filename.localeCompare(b.data.filename);
            case 'name_desc':
                return b.data.filename.localeCompare(a.data.filename);
            case 'date_asc':
                return a.data.timestamp.toDate() - b.data.timestamp.toDate();
            case 'date_desc':
                return b.data.timestamp.toDate() - a.data.timestamp.toDate();
            default:
                return 0;
        }
    });

    return (
        <div className='flex w-full relative'>
            <div 
                style={{
                    backgroundColor: theme === 'dark' ? '#031525' : 'white',
                    color: theme === 'dark' ? '#95a5bd' : 'black'
                }}
                className="w-full mr-5 rounded-xl p-5"
            >
                <div className='flex justify-between'>
                    <p className="text-2xl font-medium">Home</p>
                    <div className='flex items-center gap-5'>
                        <div className='flex justify-end w-[10rem] '>
                            <MenuOutlinedIcon
                                style={{
                                    width: "4rem",
                                    height: "100%",
                                   
                                    borderColor: theme === 'dark' ? '#71717A' : 'gray'
                                }}
                                className={`border-[1px] ${view === "list" ? (theme === 'dark' ? 'bg-[#4E657C]' : 'bg-green-100') : "transparent"} rounded-l-full px-5 py-1 cursor-pointer`}
                                onClick={() => setView("list")}
                            />
                            <GridViewOutlinedIcon
                                style={{
                                    width: "4rem",
                                    height: "100%",
                                   
                                    borderColor: theme === 'dark' ? '#71717A' : 'gray'
                                }}
                                className={`border-[1px] ${view === "grid" ? (theme === 'dark' ? 'bg-[#4E657C]' : 'bg-green-100') : "transparent"} rounded-r-full px-5 py-1 cursor-pointer`}
                                onClick={() => setView("grid")}
                            />
                        </div>
                        <div className='sm:block hidden'>
                            <ErrorOutlineOutlinedIcon className='p hover:bg-slate-400 rounded-full cursor-pointer ' style={{fontSize: 31}} onClick={() => setPreview(true)} />
                        </div>
                    </div>
                </div>
                <div className='w-[98%] mx-auto my-5 flex flex-col gap-3'>
                    {contextMenu && (
                        <>
                        <div className='flex justify-end mt-5'>
                        <div className='flex   bg-[#DBEAFE] px-5 py-1 rounded-full w-[12%]'>
                            <div className='flex gap-1'>
                                <LinkOutlinedIcon onClick={() => handleCopyLink(contextMenu.file.data.fileURL)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                                <FileDownloadOutlinedIcon onClick={() => handleDownload(contextMenu.file.data.fileURL)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                                <DeleteOutlineOutlinedIcon onClick={() => handleDelete(contextMenu.file)} className='p-1 rounded-full hover:bg-slate-500 cursor-pointer' style={{fontSize: 30}} />
                            </div>
                           
                            <CloseIcon onClick={handleClose} className='p-1 cursor-pointer' style={{fontSize: 30}} />
                        </div>
                        </div>
                        </>
                    )}
                    {
                        sortedFiles.length === 0 ? (
                            <div className='flex flex-col gap-2 items-center justify-center h-full'>
                                <img className='w-[30%]' src="https://gdisk.vercel.app/no-files.svg" alt="" />
                                <p className='text-xl'>Welcome to Drive, the home for all your files</p>
                                <p>Use the “New” button to upload</p>
                            </div>
                        ) : (
                            <>
                                {
                                    view === "list" ? (
                                        <>
                                            <div className='flex justify-between px-4'>
                                                <p>File Name</p>
                                            </div>
                                            <div className='flex flex-col gap-2 overflow-y-scroll pr-2 h-[68vh]'>
                                                {sortedFiles.map(({ id, data }) => (
                                                    <div
                                                        key={id}
                                                        className={`hover-transition flex sm:flex-row flex-col items-center justify-between p-4 rounded-xl cursor-pointer bg-slate-200  ${
                                                            theme === 'dark' ? 'bg-[#0D2136] hover:bg-[#172554]' : 'bg-slate-100 hover:bg-[#DBEAFE]'
                                                        }`}
                                                        onClick={() => handlePreview({ id, data })}
                                                    >
                                                        <p>{data.filename}</p>
                                                        <p className='sm:hidden block'>Size: {changeBytes(data.size)}</p>
                                                        <p className='sm:hidden block'>Last modified: {new Date(data.timestamp?.toDate()).toLocaleDateString()}</p>
                                                        <a href={data.fileURL} className='text-blue-400 sm:hidden block' target='_blank'>Open File</a>
                                                        <MoreHorizOutlinedIcon
                                                            style={{ fontSize: 35 }}
                                                            className='p-2 rounded-full hover:bg-slate-400 cursor-pointer'
                                                            onClick={(e) => handleContextMenu(e, { id, data })}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex flex-wrap gap-3 overflow-y-scroll pr-2 h-[68vh]'>
                                            {sortedFiles.map(({ id, data }) => (
                                                <div
                                                    key={id}
                                                    onClick={() => handlePreview({ id, data })}
                                                    className={`hover-transition flex flex-col sm:items-start items-center p-4 rounded-lg gap-2 cursor-pointer sm:h-1/2 h-[80%] ${
                                                        theme === 'dark' ? 'bg-[#0D2136] hover:bg-[#172554]' : 'bg-slate-100 hover:bg-[#DBEAFE]'
                                                    } ${preview === true ? 'w-[48%]' : 'md:w-[24%] sm:w-[45%] w-full'}`}
                                                >
                                                    <div className='flex justify-between items-center w-full'>
                                                        <p>{data.filename}</p>
                                                        <MoreVertOutlinedIcon
                                                            style={{ fontSize: 35 }}
                                                            className='p-2 rounded-full hover:bg-slate-400 cursor-pointer'
                                                            onClick={(e) => handleContextMenu(e, { id, data })}
                                                        />
                                                    </div>
                                                    <div 
                                                        style={{ backgroundColor: theme === 'dark' ? '#334155' : 'white' }}
                                                        className='w-full sm:h-[8rem] h-[30rem] rounded-lg flex justify-center items-center'
                                                    >
                                                        <p 
                                                            style={{ color: theme === 'dark' ? '#94A3B8' : '#71717A' }}
                                                            className='text-3xl font-bold'
                                                        >
                                                            {(data.filename.slice(data.filename.lastIndexOf(".") + 1)).toUpperCase()}
                                                        </p>
                                                    </div>
                                                    <p className='sm:hidden block'>Size: {changeBytes(data.size)}</p>
                                                    <p className='sm:hidden block'>Last Modified: {new Date(data.timestamp?.toDate()).toLocaleDateString()}</p>
                                                    <a href={data.fileURL} className='text-blue-400 sm:hidden block' target='_blank'>Open File</a>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            {
                preview ? <Preview previewFile={previewFile} changeBytes={changeBytes} preview={preview} setPreview={setPreview} theme={theme} /> : <></>
            }
           
        </div>
    );
}

export default Data;
