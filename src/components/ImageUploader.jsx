import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

export const ImageUploader = ({ defaultImage, onFileSelect }) => {
    const [preview, setPreview] = useState(defaultImage);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
        onFileSelect(null); 
    };

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={preview} alt="Profile" className="object-cover"/>
                <AvatarFallback>EMP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <Button type="button" onClick={() => fileInputRef.current.click()}>
                    <Upload /> Change picture
                </Button>
                {preview && (
                    <Button type="button" variant="ghost" onClick={handleRemoveImage}>
                        <X /> Remove
                    </Button>
                )}
            </div>
        </div>
    );
};