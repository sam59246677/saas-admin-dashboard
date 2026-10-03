
import { useState } from "react";
import {useMutation,useQuery,useQueryClient,} from "@tanstack/react-query";
import UserForm from "../components/UserForm";
import {getUsers,createUser,deleteUser,updateUser,} from "../services/userService";
import type {User,CreateUserInput,} from "../types/user";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const ITEMS_PER_PAGE = 5;

function Users() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const [sortDirection, setSortDirection] =useState<"asc" | "desc">("asc");

  function handleSort(field: "name" | "email") {
    setCurrentPage(1);
    if (sortField === field) {
      setSortDirection((direction) => direction === "asc" ? "desc": "asc");
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  }

  // --------------------------------
  // Get Users
  // --------------------------------

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort(
    (a, b) => {
      const valueA =
        a[sortField].toLowerCase();

      const valueB =
        b[sortField].toLowerCase();

      const comparison =
        valueA.localeCompare(valueB);

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    }
  );

  const totalUsers = filteredUsers.length;

  const totalPages =
    Math.ceil(
      totalUsers / ITEMS_PER_PAGE
    );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedUsers =
    sortedUsers.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  // --------------------------------
  // Create User
  // --------------------------------

  const createMutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // --------------------------------
  // Delete User
  // --------------------------------

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // --------------------------------
  // Update User
  // --------------------------------

  const updateMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setEditingUser(null);
    },
  });

  // --------------------------------
  // Create Handler
  // --------------------------------

  function handleCreateUser(
    data: CreateUserInput
  ) {
    createMutation.mutate(data);
  }

  // --------------------------------
  // Update Handler
  // --------------------------------

  function handleUpdateUser(
    data: CreateUserInput
  ) {
    if (!editingUser) {
      return;
    }

    updateMutation.mutate({
      id: editingUser.id,
      name: data.name,
      email: data.email,
    });
  }

  // --------------------------------
  // Loading
  // --------------------------------

  if (isLoading) {
    return (
      <LoadingState message="Loading users..." />
    );
  }

  // --------------------------------
  // Error
  // --------------------------------

  if (isError) {
    return (
      <ErrorState message="Failed to load users." />
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState
        message="There are no users to display."
      />
    );
  }

  return (
    <div>
      {/* Page Header */}

      <div className="mb-6">
        <h1
          className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Users
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Manage your users
        </p>
      </div>

      {/* Search & Filter */}

      <div
        className="
          mb-6
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search */}

          <div className="flex-1">
            <label
              htmlFor="search"
              className="
                mb-1
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Search
            </label>

            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or email..."
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                py-2
                text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />
          </div>

          {/* Status Filter */}

          <div className="w-full md:w-48">
            <label
              htmlFor="status"
              className="
                mb-1
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Status
            </label>

            <select
              id="status"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                py-2
                text-slate-900
                outline-none
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="All">
                All
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* User Form */}

      <UserForm
        user={editingUser}
        onSubmit={
          editingUser
            ? handleUpdateUser
            : handleCreateUser
        }
        onCancel={() =>
          setEditingUser(null)
        }
        isPending={
          createMutation.isPending ||
          updateMutation.isPending
        }
        isError={
          createMutation.isError ||
          updateMutation.isError
        }
        isSuccess={
          createMutation.isSuccess ||
          updateMutation.isSuccess
        }
      />

      {/* Users Table */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="
                border-b
                border-slate-200
                bg-slate-50
                dark:border-slate-800
                dark:bg-slate-800
              "
            >
              <tr>
                {/* Name */}

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleSort("name")
                    }
                    className="
                      flex
                      items-center
                      gap-1
                      hover:text-slate-900
                      dark:hover:text-white
                    "
                  >
                    Name

                    <span>
                      {sortField === "name"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>

                {/* Email */}

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleSort("email")
                    }
                    className="
                      flex
                      items-center
                      gap-1
                      hover:text-slate-900
                      dark:hover:text-white
                    "
                  >
                    Email

                    <span>
                      {sortField === "email"
                        ? sortDirection === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>

                {/* Status */}

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Status
                </th>

                {/* Actions */}

                <th
                  className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody
              className="
                divide-y
                divide-slate-200
                dark:divide-slate-800
              "
            >
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="
                    hover:bg-slate-50
                    dark:hover:bg-slate-800
                  "
                >
                  {/* Name */}

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {user.name}
                  </td>

                  {/* Email */}

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {user.email}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">
                    <span
                      className={
                        user.status === "Active"
                          ? `
                            rounded-full
                            bg-green-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-green-700
                            dark:bg-green-950
                            dark:text-green-400
                          `
                          : `
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-slate-600
                            dark:bg-slate-800
                            dark:text-slate-400
                          `
                      }
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          setEditingUser(user)
                        }
                        className="
                          text-sm
                          font-medium
                          text-blue-600
                          hover:text-blue-800
                          dark:text-blue-400
                          dark:hover:text-blue-300
                        "
                      >
                        Edit
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          deleteMutation.mutate(
                            user.id
                          )
                        }
                        disabled={
                          deleteMutation.isPending
                        }
                        className="
                          text-sm
                          font-medium
                          text-red-600
                          hover:text-red-800
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          dark:text-red-400
                          dark:hover:text-red-300
                        "
                      >
                        {deleteMutation.isPending
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-slate-200
              px-6
              py-4
              dark:border-slate-800
            "
          >
            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                disabled={currentPage === 1}
                className="
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                className="
                  rounded-lg
                  border
                  border-slate-300
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
