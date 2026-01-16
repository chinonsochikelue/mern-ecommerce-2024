import { FileIcon, UploadCloudIcon, XIcon, GripVerticalIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  imageLoadingState,
  uploadedImageUrls,
  setUploadedImageUrls,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const maxImages = 5;

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    const remainingSlots = maxImages - (imageFiles?.length || 0);
    
    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s). Maximum ${maxImages} images allowed.`);
      return;
    }
    
    if (selectedFiles.length > 0) {
      setImageFiles([...(imageFiles || []), ...selectedFiles]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    const imageOnlyFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - (imageFiles?.length || 0);
    
    if (imageOnlyFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s). Maximum ${maxImages} images allowed.`);
      return;
    }
    
    if (imageOnlyFiles.length > 0) {
      setImageFiles([...(imageFiles || []), ...imageOnlyFiles]);
    }
  }

  function handleRemoveImage(index) {
    const newImageFiles = [...(imageFiles || [])];
    const newUploadedUrls = [...(uploadedImageUrls || [])];
    
    newImageFiles.splice(index, 1);
    newUploadedUrls.splice(index, 1);
    
    setImageFiles(newImageFiles);
    setUploadedImageUrls(newUploadedUrls);
    
    if (inputRef.current && newImageFiles.length === 0) {
      inputRef.current.value = "";
    }
  }

  // Drag and drop reordering
  function handleDragStart(index) {
    setDraggedIndex(index);
  }

  function handleDragEnter(index) {
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newImageFiles = [...(imageFiles || [])];
    const newUploadedUrls = [...(uploadedImageUrls || [])];
    
    const draggedFile = newImageFiles[draggedIndex];
    const draggedUrl = newUploadedUrls[draggedIndex];
    
    newImageFiles.splice(draggedIndex, 1);
    newImageFiles.splice(index, 0, draggedFile);
    
    if (draggedUrl) {
      newUploadedUrls.splice(draggedIndex, 1);
      newUploadedUrls.splice(index, 0, draggedUrl);
      setUploadedImageUrls(newUploadedUrls);
    }
    
    setImageFiles(newImageFiles);
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  async function uploadImageToCloudinary(file, index) {
    const data = new FormData();
    data.append("my_file", file);
    
    try {
      const response = await axios.post(
        "https://mern-ecommerce-2024-pqr1.onrender.com/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrls(prev => {
          const newUrls = [...(prev || [])];
          newUrls[index] = response.data.result.url;
          return newUrls;
        });
      }
    } catch (error) {
      console.error("Upload failed for image", index, error);
    }
  }

  useEffect(() => {
    if (imageFiles && imageFiles.length > 0) {
      setImageLoadingState(true);
      
      const uploadPromises = imageFiles.map((file, index) => {
        // Only upload if not already uploaded
        if (!uploadedImageUrls?.[index]) {
          return uploadImageToCloudinary(file, index);
        }
        return Promise.resolve();
      });

      Promise.all(uploadPromises).then(() => {
        setImageLoadingState(false);
      });
    }
  }, [imageFiles]);

  const hasImages = imageFiles && imageFiles.length > 0;
  const canAddMore = !hasImages || imageFiles.length < maxImages;

  return (
    <div
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">
        Upload Images ({imageFiles?.length || 0}/{maxImages})
      </Label>
      
      {/* Upload area */}
      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-4 mb-4"
        >
          <Input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
          />
          <Label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-center">
              Drag & drop or click to upload images
              <br />
              <span className="text-xs text-muted-foreground">
                {imageFiles?.length || 0} of {maxImages} images
              </span>
            </span>
          </Label>
        </div>
      )}

      {/* Image previews grid */}
      {hasImages && (
        <div className="grid grid-cols-2 gap-3">
          {imageFiles.map((file, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              className={`relative border-2 rounded-lg p-2 cursor-move hover:border-primary transition-all ${
                draggedIndex === index ? "opacity-50" : ""
              }`}
            >
              {/* Drag handle */}
              <div className="absolute top-1 left-1 bg-background/80 rounded p-1">
                <GripVerticalIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
              
              {/* Remove button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute bottom-1 right-1 h-6 w-6"
                onClick={() => handleRemoveImage(index)}
              >
                <XIcon className="w-4 h-4" />
              </Button>

              {/* Image preview or loading */}
              {imageLoadingState && !uploadedImageUrls?.[index] ? (
                <Skeleton className="h-32 w-full bg-gray-100" />
              ) : uploadedImageUrls?.[index] ? (
                <img
                  src={uploadedImageUrls[index]}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-32">
                  <FileIcon className="w-8 h-8 text-primary mb-2" />
                  <p className="text-xs font-medium text-center truncate w-full px-2">
                    {file.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {hasImages && (
        <p className="text-xs text-muted-foreground mt-2">
          Drag images to reorder. First image will be the primary display image.
        </p>
      )}
    </div>
  );
}

export default ProductImageUpload;
