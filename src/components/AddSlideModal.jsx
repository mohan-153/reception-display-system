import { useState } from "react";

export default function AddSlideModal({
  showModal,
  setShowModal,
  fetchSlides,
}) {
  const [order, setOrder] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [image, setImage] = useState(null);

  const handleAddSlide = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("order", order);
      formData.append("title", title);
      formData.append(
        "description",
        description
      );
      formData.append("image", image);

      const res = await fetch(
        "/api/slides/add",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Slide Added");

        setShowModal(false);

        fetchSlides();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-[500px] p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-5">
          Add New Slide
        </h2>

        <form
          onSubmit={handleAddSlide}
          className="space-y-4"
        >
          <input
            type="number"
            placeholder="Order Number"
            className="w-full border p-3 rounded"
            value={order}
            onChange={(e) =>
              setOrder(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Title"
            className="w-full border p-3 rounded"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="w-full border p-3 rounded"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Add Slide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}