import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { AiOutlineClose } from "react-icons/ai";
import { DepoButton } from "../DepoButton";
import { ImageLoading } from "../../ImageLoading";
import "@tailwindcss/typography";
import { LazyImage } from "../LazyImage";

export const ModalProject = ({ isOpen, onClose, project, imageLoadingStates, setImageLoadingStates, projOne }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 p-4"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-neutral90 rounded-lg shadow-lg w-full max-w-5xl   overflow-auto p-6 relative transform scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-black bg-Destaque rounded-full p-2"
            onClick={onClose}
          >
            <AiOutlineClose size={28} color="#fff" />
          </button>
          <h1 className="border-b-2 border-primary90 text-2xl lg:text-5xl font-principal font-bold text-neutral10 text-center absolute left-1/2 transform -translate-x-1/2 rounded-md mt-6">
            {project.nome}
          </h1>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          resource="screenshot"
          spaceBetween={20}
          slidesPerView={1}
          className="mb-6 mt-16 lg:h-[50vh] h-[25vh] overflow-hidden"
        >
          <div
            className="swiper-button-next p-7 md:opacity-100 opacity-0"
            style={{
              right: "5px",
              backgroundColor: "#FF560c",
              borderRadius: "50%",
              color: "#fff",
            }}
          ></div>
          <div
            className="swiper-button-prev p-7 md:opacity-100 opacity-0"
            style={{
              left: "5px",
              backgroundColor: "#FF560c",
              borderRadius: "50%",
              color: "#fff",
            }}
          ></div>
          {project.screenshots.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                {imageLoadingStates[index] && (
                  <div className="w-full h-full absolute flex items-center justify-center">
                    <ImageLoading />
                  </div>
                )}
                <LazyImage
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  className={`w-full h-full object-contain transition-opacity ${
                    imageLoadingStates[index] ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => {
                    setImageLoadingStates((prevState) => prevState.map((state, i) => (i === index ? false : state)));
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mb-4 mt-4 bg-neutral10 p-4 rounded-lg font-principal max-w-2xl mx-auto text-center">
          <p className="text-neutral90 leading-relaxed text-sm md:text-lg">{project.descricao}</p>
        </div>
        {/* Tecnologias */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {project.technologys.map((tech, idx) => (
            <div
              key={idx}
              className="bg-Destaque text-white px-3 py-2 text-sm md:text-base rounded-lg shadow-md font-medium text-center"
            >
              {tech}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center gap-4 mt-4 absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {project.frontend && (
            <a href={project.frontend} target="_blank" rel="noopener noreferrer">
              <DepoButton message={"FrontEnd"} bg={"666F7D"} />
            </a>
          )}
          {project.backend && (
            <a href={project.backend} target="_blank" rel="noopener noreferrer">
              <DepoButton message={"BackEnd"} bg="333333" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
