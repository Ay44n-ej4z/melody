import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopArtistQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data, isFetching, error } = useGetTopArtistQuery();

  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;
  console.log(data)
  return (
    <div className="flex flex-col">
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Top Artists</h2>
       
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i)=> 
        <SongCard   
        key={song.key}
        song = {song}
        isPlaying = {isPlaying}
        activeSong = {activeSong}
        data = {data}
        i = {i}
        />
        )}
    </div>
</div>
  );
};

export default TopArtists;
