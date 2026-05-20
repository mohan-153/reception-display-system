    "use client";

    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import Image from "next/image";

    export default function DashboardPage() {
      const router = useRouter();

      const [slides, setSlides] =
        useState([]);

      const [loading, setLoading] =
        useState(true);

      const [showModal, setShowModal] =
        useState(false);

      const [title, setTitle] =
        useState("");

      const [description, setDescription] =
        useState("");

      const [image, setImage] =
        useState(null);

      const [order, setOrder] =
        useState("");

      const [editId, setEditId] =
        useState(null);

      const [editMode, setEditMode] =
        useState(false);

      // FETCH SLIDES
      const fetchSlides = async () => {
        try {
          const res = await fetch(
            "/api/slides/get"
          );

          const data = await res.json();

          setSlides(
            Array.isArray(data) ? data : []
          );
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        const admin =
          localStorage.getItem("admin");

        if (admin !== "true") {
          router.replace("/login");
          return;
        }

        fetchSlides();

        setLoading(false);
      }, []);

      // LOGOUT
      const handleLogout = () => {

        const confirmLogout =
          window.confirm(
            "Are you sure you want to logout?"
          );

        if (!confirmLogout) return;

        localStorage.removeItem(
          "admin"
        );

        document.cookie =
          "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        alert("Logout Successful");

        router.replace("/");
      };

      // ADD SLIDE
      const handleAddSlide = async (
        e
      ) => {
        e.preventDefault();

        try {
          const formData =
            new FormData();

          formData.append(
            "order",
            order
          );

          formData.append(
            "title",
            title
          );

          formData.append(
            "description",
            description
          );

          if (image) {
            formData.append(
              "image",
              image
            );
          }

          const res = await fetch(
            "/api/slides/add",
            {
              method: "POST",
              body: formData,
            }
          );

          const data =
            await res.json();

          if (data.success) {
            alert("Slide Added");

            setShowModal(false);

            setTitle("");

            setDescription("");

            setImage(null);

            setOrder("");

            fetchSlides();
          }
        } catch (error) {
          console.log(error);
        }
      };

      // EDIT BUTTON
      const handleEdit = (slide) => {
        setEditMode(true);

        setEditId(slide._id);

        setOrder(slide.order);

        setTitle(slide.title);

        setDescription(
          slide.description
        );

        setShowModal(true);
      };

      // UPDATE SLIDE
      const handleUpdateSlide =
        async (e) => {
          e.preventDefault();

          try {
            const formData =
              new FormData();

            formData.append(
              "id",
              editId
            );

            formData.append(
              "order",
              order
            );

            formData.append(
              "title",
              title
            );

            formData.append(
              "description",
              description
            );

            if (image) {
              formData.append(
                "image",
                image
              );
            }

            const res = await fetch(
              "/api/slides/update",
              {
                method: "PUT",
                body: formData,
              }
            );

            const data =
              await res.json();

            if (data.success) {
              alert("Slide Updated");

              setShowModal(false);

              setEditMode(false);

              setEditId(null);

              setOrder("");

              setTitle("");

              setDescription("");

              setImage(null);

              fetchSlides();
            }
          } catch (error) {
            console.log(error);
          }
        };

      // TOGGLE SHOW / HIDE
      const handleToggle = async (
        id
      ) => {
        try {
          await fetch(
            `/api/slides/toggle?id=${id}`,
            {
              method: "PUT",
            }
          );

          fetchSlides();
        } catch (error) {
          console.log(error);
        }
      };

      // DELETE
      const handleDelete = async (
        id
      ) => {
        const confirmDelete =
          confirm(
            "Are you sure want to delete?"
          );

        if (!confirmDelete) return;

        try {
          await fetch(
            `/api/slides/delete?id=${id}`,
            {
              method: "DELETE",
            }
          );

          fetchSlides();
        } catch (error) {
          console.log(error);
        }
      };

      if (loading) {
        return null;
      }

      return (
        <div className="w-full min-h-screen bg-linear-to-br from-[#EEF2FF] via-[#E9EAFB] to-[#E5E7F5]">

          {/* NAVBAR */}
          <div className="w-full bg-[#4338CA] text-[#F8FAFC] flex justify-between items-center px-6 py-4 shadow-lg">

            {/* LOGO */}
            <div className="bg-[#F8FAFC] px-4 py-2 rounded-2xl shadow-md border border-[#DDE3F0]">
              <Image
                src="/logo2.png"
                alt="logo"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-[#EF4444] hover:bg-[#DC2626] px-4 py-2 rounded-xl text-sm text-white transition"
            >
              Logout
            </button>
          </div>

          {/* BODY */}
          <div className="grid grid-cols-12 gap-4 p-4 min-h-[calc(100vh-90px)]">

            {/* LEFT PREVIEW */}
            <div className="col-span-2 bg-[#F4F6FB] rounded-2xl shadow-md p-3 border border-[#DCE3F1]">

              <h2 className="text-lg font-semibold mb-3 text-[#374151]">
                Preview
              </h2>

              <div className="space-y-3">

                {slides
                  .sort(
                    (a, b) =>
                      a.order - b.order
                  )
                  .map((slide) => (
                    <div
                      key={slide._id}
                      className="bg-[#FCFCFD] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm"
                    >
                      {slide.image.match(
                        /\.(mp4|webm|ogg)$/i
                      ) ? (

                        <video
                          src={`/uploads/${slide.image}`}
                          className="w-full h-28 object-cover"
                          muted
                        />

                      ) : (

                        <img
                          src={`/uploads/${slide.image}`}
                          alt="slide"
                          className="w-full h-28 object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-span-10 bg-[#F8FAFC] rounded-2xl shadow-md p-4 border border-[#DCE3F1]">

              {/* TOP */}
              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-semibold text-[#312E81]">
                  Manage Slides
                </h2>

                <div className="flex gap-3">

                  {/* DISPLAY SCREEN */}
                  <button
                    onClick={() =>
                      router.push(
                        "/display"
                      )
                    }
                    className="bg-[#6366F1] hover:bg-[#5558E8] text-white px-4 py-2 rounded-xl text-sm transition"
                  >
                    Display Screen
                  </button>

                  {/* ADD SLIDE */}
                  <button
                    onClick={() => {
                      setEditMode(false);

                      setEditId(null);

                      setOrder("");

                      setTitle("");

                      setDescription("");

                      setImage(null);

                      setShowModal(true);
                    }}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-sm transition"
                  >
                    + Add Slide
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full border border-[#DCE3F1] rounded-xl overflow-hidden">

                  <thead className="bg-[#E8ECF7] text-[#374151]">

                    <tr>

                      <th className="p-3 border border-[#DCE3F1] text-sm">
                        Order
                      </th>

                      <th className="p-3 border border-[#DCE3F1] text-sm">
                        Image
                      </th>

                      <th className="p-3 border border-[#DCE3F1] text-sm">
                        Title
                      </th>

                      <th className="p-3 border border-[#DCE3F1] text-sm">
                        Description
                      </th>

                      <th className="p-3 border border-[#DCE3F1] text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {slides
                      .sort(
                        (a, b) =>
                          a.order - b.order
                      )
                      .map((slide) => (
                        <tr
                          key={slide._id}
                          className="text-center bg-[#FCFCFD] hover:bg-[#F5F7FB] transition"
                        >

                          {/* ORDER */}
                          <td className="p-3 border border-[#DCE3F1] text-sm font-semibold align-middle text-[#374151]">
                            {slide.order}
                          </td>

                          {/* IMAGE */}
                          <td className="p-3 border border-[#DCE3F1] align-middle">

                            <div className="flex justify-center">

                              {slide.image.match(
                                /\.(mp4|webm|ogg)$/i
                              ) ? (

                                <video
                                  src={`/uploads/${slide.image}`}
                                  className="w-24 h-16 object-cover rounded-lg"
                                  muted
                                />

                              ) : (

                                <img
                                  src={`/uploads/${slide.image}`}
                                  alt="slide"
                                  className="w-24 h-16 object-cover rounded-lg"
                                />
                              )}
                            </div>
                          </td>

                          {/* TITLE */}
                          <td className="p-3 border border-[#DCE3F1] text-sm font-semibold align-middle text-[#374151]">
                            {slide.title}
                          </td>

                          {/* DESCRIPTION */}
                          <td className="p-3 border border-[#DCE3F1] text-sm align-middle text-[#4B5563]">
                            {
                              slide.description
                            }
                          </td>

                          {/* ACTIONS */}
                          <td className="p-3 border border-[#DCE3F1] align-middle">

                            <div className="flex gap-2 justify-center items-center">

                              {/* SHOW / HIDE */}
                              <button
                                onClick={() =>
                                  handleToggle(
                                    slide._id
                                  )
                                }
                                className={`px-3 py-1 rounded-xl text-white text-sm transition ${slide.isVisible
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#6366F1]"
                                  }`}
                              >
                                {slide.isVisible
                                  ? "Hide"
                                  : "Show"}
                              </button>

                              {/* EDIT */}
                              <button
                                onClick={() =>
                                  handleEdit(
                                    slide
                                  )
                                }
                                className="bg-[#6366F1] hover:bg-[#5558E8] text-white px-3 py-1 rounded-xl text-sm transition"
                              >
                                Edit
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  handleDelete(
                                    slide._id
                                  )
                                }
                                className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-3 py-1 rounded-xl text-sm transition"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MODAL */}
          {showModal && (
            <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm flex justify-center items-center">

              <div className="bg-[#F8FAFC] w-112.5 p-6 rounded-3xl shadow-2xl border border-[#DCE3F1]">

                <h2 className="text-2xl font-semibold text-[#312E81] mb-5">
                  {editMode
                    ? "Edit Slide"
                    : "Add New Slide"}
                </h2>

                <form
                  onSubmit={
                    editMode
                      ? handleUpdateSlide
                      : handleAddSlide
                  }
                  className="space-y-4"
                >

                  {/* ORDER */}
                  <input
                    type="number"
                    placeholder="Order Number"
                    className="w-full border border-[#DCE3F1] bg-white p-3 rounded-xl outline-none focus:border-[#8B5CF6] text-[#374151] placeholder:text-[#9CA3AF]"
                    value={order}
                    onChange={(e) =>
                      setOrder(
                        e.target.value
                      )
                    }
                    required
                  />

                  {/* TITLE */}
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full border border-[#DCE3F1] bg-white p-3 rounded-xl outline-none focus:border-[#8B5CF6] text-[#374151] placeholder:text-[#9CA3AF]"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    required
                  />

                  {/* DESCRIPTION */}
                  <textarea
                    placeholder="Description"
                    className="w-full border border-[#DCE3F1] bg-white p-3 rounded-xl outline-none focus:border-[#8B5CF6] text-[#374151] placeholder:text-[#9CA3AF]"
                    rows={4}
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                    required
                  />

                  {/* IMAGE */}
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm"
                    className="w-full text-sm text-[#4B5563]"
                    onChange={(e) =>
                      setImage(
                        e.target.files[0]
                      )
                    }
                  />

                  {/* BUTTONS */}
                  <div className="flex justify-end gap-3">

                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(
                          false
                        );

                        setEditMode(
                          false
                        );

                        setEditId(
                          null
                        );
                      }}
                      className="bg-[#CBD5E1] hover:bg-[#B6C2D1] text-[#374151] px-5 py-2 rounded-xl transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-5 py-2 rounded-xl transition"
                    >
                      {editMode
                        ? "Update Slide"
                        : "Add Slide"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    }