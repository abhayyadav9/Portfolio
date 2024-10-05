import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTheme } from "@/contexts/themeContext";

const ProjectDialog = ({ isOpen, onClose, onAction, title, link, description, image }) => {
  const { isDarkMode } = useTheme(); // Accessing theme context

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}> {/* Close when clicking outside */}
      <AlertDialogContent
        className={`p-6 max-w-lg mx-auto ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <AlertDialogHeader>
          {/* Project title */}
          <AlertDialogTitle className="text-2xl font-bold mb-2 text-center">
            {title}
          </AlertDialogTitle>

          {/* Project image */}
          <div className="flex justify-center mb-4">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-40 w-full object-cover rounded-lg"
              />
            ) : (
              <div className="h-40 w-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            )}
          </div>

          {/* Project description */}
          <AlertDialogDescription className="text-lg mb-4 text-center">
            {description}
          </AlertDialogDescription>

          {/* Project link */}
          {link && (
            <div className="text-center mb-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Visit Project
              </a>
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center space-x-4">
          {/* Cancel button */}
          <AlertDialogCancel
            className={`px-4 py-2 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } rounded-lg`}
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>

          {/* Delete action */}
          <AlertDialogAction
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={onAction}
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDialog;
