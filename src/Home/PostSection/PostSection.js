import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import icon from "../../assets/multimedia.png";
import icon1 from "../../assets/upload.png";
import { AuthContext } from "../../contexts/AuthProvider";

const PostSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  //   console.log(imageHostKey);

  const { user, loading } = useContext(AuthContext);
  // console.log("user --", user);
  const navigate = useNavigate();

  const handleAddPost = (data) => {
    // console.log("user details", user);
    const image = data.image[0];
    // console.log(data.image[0]);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        if (imgData.success) {
          console.log(imgData.data.url);

          const post = {
            text: data.post,
            image: imgData.data.url,
            name: user.displayName,
            userPhoto: user.photoURL,
          };
          //save all the post to the database
          fetch(" https://social-media-task-server-eight.vercel.app/allposts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success("Successfully posted");
              navigate("/media");
            });
        }
      });
  };

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div className="my-6 grid grid-cols-1">
      <form onSubmit={handleSubmit(handleAddPost)} className="">
        <input
          className="textarea textarea-bordered w-full rounded-2xl p-3 mb-5"
          placeholder="Whats on your mind?"
          {...register("post", { required: "Text is required" })}
        />
        {errors.post && <p className="text-red-500">{errors.post.message}</p>}
        <br />

        <div className="my-3 flex items-center justify-center">
          {" "}
          <label htmlFor="files" className="">
            <img className="w-8 h-8 mr-2" src={icon1} alt="" />
          </label>
          <input
            placeholder="upload pic"
            id="files"
            style={{
              display: "flex",
              color: "blue",
              fontWeight: "bold",
            }}
            // style={{ color: "bg-black" }}
            type="file"
            className="file-input file-input-bordered file-input-accent"
            {...register("image", { required: "file is required" })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <hr className="bg-black h-1 mb-2" />
        {user?.uid ? (
          <div className="flex justify-center">
            <input
              className="mb-3 btn glass bg-accent hover:bg-sky-400 hover:text-white "
              value="Submit"
              type="submit"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <Link>
              {" "}
              <p className="text-xl">
                <span className="italic text-blue-700 font-bold text-2xl">
                  Login
                </span>{" "}
                First if you want to Post
              </p>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostSection;
