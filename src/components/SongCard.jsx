import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineYoutube } from "react-icons/ai";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useState } from "react";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import Error from "./Error";
import Loader from "./Loader";
import { loader } from "../assets";

const SongCard = ({ song, activeSong, isPlaying, i, data }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const songDetails = useGetSongDetailsQuery(song.key)
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const modelOpen = () => {
    console.log(songDetails, song.key)
    setShowModal(true)

    if (songDetails.isFetching) songDetails.refetch()
    if (songDetails.error) songDetails.refetch()
    if (songDetails.data === undefined) return <p> Loadiunfg</p>
  }
  return (
    <>
     
      <div className="flex flex-col w-[205px] p-4 bg-white/5 bg-opacity-100 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-25 group">
          <div className={`absolute inset-0 justify-center items-center bg-black
        bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70'
              : 'hidden'}`}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img alt="song_img" src={song.images?.coverart || song.hub.image} />
        </div>
        <div className="mt-4 flex flex-col">
          <p onClick={() => modelOpen()} className="font-semibold text-lg text-white truncate">
            {song.title}
          </p>
          <p onClick={() => modelOpen()} className="text-sm truncate text-green-300 mt-1">
            {song.subtitle}
          </p>
        </div>
      </div>
      <>
      </>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
             {songDetails.error ? <div className="w-full flex justify-center place-items-center flex-col">
          <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
          <h1 className="font-bold text-2xl text-white mt-2">{"Loading..."}</h1>
        </div> : 
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-tl from-black  to-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col p-5 border-b border-solid  text-slate-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {songDetails?.data?.title}
                  </h3>
                  <p className="text-sm truncate text-green-300 mt-1">
                    {songDetails?.data?.subtitle}
                  </p>
                  <p className="text-sm truncate text-green-300 mt-1">
                    {songDetails?.data?.genres?.primary}
                  </p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <p className=" text-slate-500 text-lg leading-relaxed">
                    {songDetails?.data?.share?.subject}
                  </p>
                  <p className="text-slate-500 text-lg leading-relaxed">{songDetails?.data?.sections[1]?.footer}</p>
                  <div className="flex flex-row items-center ">
                    <a href={songDetails?.data?.sections[2]?.youtubeurl?.actions[0]?.uri} className="text-green-300 text-lg leading-relaxed underline">Youtube</a>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
}
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
};

export default SongCard;
