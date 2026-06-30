import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export type FormValues = {
  title: string;
  description: string;
  duration: string;
};


type CourseFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormValues>;
  course?: any;
  title: string;
  submitText: string;
};

export default function CourseFormModal({
  open,
  onClose,
  onSubmit,
  course,
  title,
  submitText,
}: CourseFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!open) return;

    if (course) {
      reset({
        title: course.title,
        description: course.description,
        duration: course.duration,
      });
    } else {
      reset({
        title: "",
        description: "",
        duration: "",
      });
    }
  }, [course, open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>

          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* title */}
          <div>
            <label className="block mb-1 font-medium">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              {...register("title", {
                required: "title is required",
              })}
              placeholder="Enter course title"
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

            {/* Description */}
              <div>
                <label className="block mb-1 font-medium">
                  Description <span className="text-error">*</span>
                </label>

                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className={`w-full border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 ${
                    errors.description
                      ? "border-error focus:ring-error"
                      : "border-gray-300 focus:ring-primary"
                  }`}
                />

                {errors.description && (
                  <p className="text-error text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 font-medium">
              Duration <span className="text-red-500">*</span>
            </label>

            <input
              {...register("duration", {
                required: "duration is required",
              })}
              placeholder="Enter course duration"
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
