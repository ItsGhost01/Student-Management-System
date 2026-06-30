import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export type FormValues = {
  name: string;
  email: string;
  age: number;
  image: FileList;
  courseId: number;
};

interface Course {
  id: number;
  title: string;
}

type StudentFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FormValues>;
  courses: Course[];
  student?: any;
  title: string;
  submitText: string;
  loading?: boolean;
};

export default function StudentFormModal({
  open,
  onClose,
  onSubmit,
  courses,
  student,
  title,
  submitText,
  loading = false,
}: StudentFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (!open) return;

    if (student) {
      reset({
        name: student.name,
        email: student.email,
        age: student.age,
        courseId: student.courseId,
      });
    } else {
      reset({
        name: "",
        email: "",
        age: undefined,
        courseId: undefined,
      });
    }
  }, [student, open, reset]);

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
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="John Doe"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-error"
                  : "border-gray-300  focus:ring-primary"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="john@gmail.com"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500  focus:ring-error"
                  : "border-gray-300  focus:ring-primary"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 font-medium">
              Age <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Age must be greater than 0",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2  ${
                errors.age
                  ? "border-red-500  focus:ring-error"
                  : "border-gray-300  focus:ring-primary"
              }`}
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-1 font-medium">
              Course <span className="text-red-500">*</span>
            </label>

            <select
              {...register("courseId", {
                required: "Course is required",
                valueAsNumber: true,
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2  ${
                errors.courseId
                  ? "border-red-500  focus:ring-error"
                  : "border-gray-300  focus:ring-primary"
              }`}
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            {errors.courseId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseId.message}
              </p>
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
              disabled={loading}
              className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">
                  {submitText === "Update Student"
                    ? "Updating..."
                    : "Adding..."}
                </span>
              ) : (
                submitText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
