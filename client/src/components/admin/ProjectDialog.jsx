import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineEdit } from "react-icons/md";

export function ProjectDialog({ project, onClose, onSave }) {
  const [name, setName] = useState(project.projectName);
  const [image, setImage] = useState(project.projectImage);
  const [description, setDescription] = useState(project.projectDescription);
  const [link, setLink] = useState(project.projectLink);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("projectName", name);
      formData.append("projectDescription", description);
      formData.append("projectLink", link);
      
      if (selectedImage) {
        formData.append("projectImage", selectedImage);
      }

      const response = await axios.put(
        `https://abhay-portfolio-orpin.vercel.app/api/v2/project/editproject/${project._id}`,
        formData,
        { 
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        onSave(response.data.updatedProject); // Send updated project back to parent
        onClose(); // Close the dialog
      } else {
        console.error("Error updating project");
      }
    } catch (error) {
      console.error("Error updating project", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-full h-full">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-">
          <div className="relative inline-block">
            <img
              src={image || '/default-profile.png'} // Default image if no preview available
              alt="Project Preview"
              className="w-full h-[250px]"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded"
            >
              Change Project Pic
              <MdOutlineEdit size={24} />
            </button>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Project Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Project Link
            </Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
