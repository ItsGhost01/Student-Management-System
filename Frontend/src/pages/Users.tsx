import { Search } from "lucide-react";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchUsers();
  }, []);


const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/delete/${selectedUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOpen(false);
    //refresh user list after deleting
    toast.success("user deleted Succesfully")
    fetchUsers();
  } catch (error) {
    toast.error("Failed to delete user")
    console.error(error);
  }
};



  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Users
          </h1>

          <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-lg">
            Total: {users.length}
          </span>
        </div>

        <p className="mt-2 text-sm md:text-base text-gray-500">Manage Users</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mt-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name..."
              className="w-full h-11 pl-12 pr-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <label className="text-sm font-medium whitespace-nowrap">
              Filter:
            </label>

            <select className="w-full sm:w-40 h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
            <select className="w-full sm:w-40 h-11 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer className="mt-3 " component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>UserId</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

    
                  </TableCell>
                </TableRow>
              ))}

              <ConfirmDialog
        
                      open={open}
                      title="Delete Student"
                      description="Are you sure you want to delete this student?"
                      onConfirm={handleDelete}
                      onCancel={() => setOpen(false)}
                    />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
