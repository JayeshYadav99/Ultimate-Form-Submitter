"use client"
import { useEffect, useState } from 'react';
import { UploadToVercelStorage } from '../../lib/BlobStorage';
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { fetchGeneration } from '../../lib/actions/generation.action';
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function ImageUploadForm({ generation:initialGeneration }: any) {
  var inputImageurl;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleUpdateParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pid", value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  console.log("Prop generation", initialGeneration);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generation, setGeneration] = useState(initialGeneration);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
    },
  });

  const handleApplyTransformation = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large");
      return;
    }

    try {
      setUploading(true);
      console.log("Uploading file");

      const { data, success } = await UploadToVercelStorage(file);
      inputImageurl = data.url;

      let bodydata = JSON.stringify({
        "prompt": {
          "text": "Generate cartoon version of given input image",
          "negative_prompt": "",
          "super_resolution": true,
          "num_images": 1,
          "cfg_scale": null,
          "steps": 30,
          "ar": "1:1",
          "face_swap": true,
          "inpaint_faces": true,
          "controlnet": "depth",
          "controlnet_conditioning_scale": null,
          "controlnet_txt2img": false,
          "input_image_url": `${data.url}`,
          "callback": "https://leading-severely-termite.ngrok-free.app/api/prompt-webhook?user_id=1"
        }
      });

      const response = await axios.post('/api/toonify', bodydata, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sd_oyFr7XogbrcorbksXT89Lpdpt67jTJ',
        },
      });

      console.log("Final Response", response.data);
      handleUpdateParams(response.data.data.promptid);

      toast.success("Image generation created!");
    } catch (error) {
      toast.error("Error creating chat");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {

    setSelectedImage(null);
    setFile(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("pid");
    params.delete("status");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };


  // useEffect(() => {
  //   const status = searchParams.get('status');
  //   const pid = searchParams.get('pid');
  
  //     if (status === 'completed') {
  //       const fetchData = async () => {
  //         const data = await fetchGeneration({ promptid: `${pid}` });
  //         setGeneration(data);
  //       };
  //       fetchData();

      
  //   }
  // }, [router]);


  return (
    <div>
      <div className="flex w-full max-w-4xl">
        <div className="flex-1 p-4 bg-white shadow-md rounded-lg mr-2">
          <h2 className="text-2xl font-semibold mb-4 text-center">Original Image</h2>
          <div className="p-2 bg-white rounded-xl">
            {!selectedImage && !generation?.inputImage ? (
              <div
                {...getRootProps({
                  className:
                    "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                })}
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select one</p>
              </div>
            ) : (
              <>
                {selectedImage && (
                  <img src={selectedImage} alt="Selected Image" className="max-h-full max-w-full object-contain" />
                )}
                {!selectedImage && generation?.inputImage && (
                  <img src={generation.inputImage} alt="Image saved" className="max-h-full max-w-full object-contain" />
                )}
                {selectedImage && (
                  <button
                    onClick={handleRemoveImage}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded transition"
                  >
                    Remove Image
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 bg-white shadow-md rounded-lg ml-2">
          <h2 className="text-2xl font-semibold mb-4 text-center">Transformed Image</h2>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex justify-center items-center h-64">
            {initialGeneration ? (
              <img src={initialGeneration?.outputImage} alt="Transformed Image" className="max-h-full max-w-full object-contain" />
            ) : (
              <p className="text-center text-gray-500">Image is processing and generating</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex mt-6 space-x-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded transition"
          onClick={handleApplyTransformation}
          disabled={uploading}
        >
          {uploading ? 'Applying...' : 'Apply Transformation'}
        </button>
        <button className="bg-purple-800 hover:bg-purple-900 text-white py-2 px-6 rounded transition">
          Save Image
        </button>
      </div>
    </div>
  );
}
