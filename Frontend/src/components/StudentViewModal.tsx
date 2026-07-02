import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type StudentViewModalProps = {
  open: boolean;
  onClose: () => void;
  student: any;
};

export default function StudentViewModal({
  open,
  onClose,
  student,
}: StudentViewModalProps) {
  if (!student) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Student Details
      </DialogTitle>

      <DialogContent>
        <div className="flex flex-col items-center">

          {/* Square Image */}
          <img
            src={student.image}
            alt={student.name}
            className="w-40 h-40 rounded-xl object-cover border-4 border-blue-500 shadow-lg"
          />

          <h2 className="mt-4 text-2xl font-bold">
            {student.name}
          </h2>

          <p className="text-gray-500">
            {student.email}
          </p>

          {/* Details Card */}
          <div className="mt-6 w-full rounded-xl border bg-gray-50 p-5 space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Student ID
              </span>

              <span>{student.studentId}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-600">
                Age
              </span>

              <span>{student.age} Years</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Course
              </span>

              <span>{student.course?.title}</span>
            </div>

          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
