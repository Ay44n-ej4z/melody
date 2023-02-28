import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const shazamCoreApi = createApi({
    reducerPath: "shazamCoreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '20d931ab6cmsh97a4299e256248cp10a4b2jsnf8bd57efa0a4');
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track?locale=en-US&pageSize=20&startFrom=0' }),
        getAroundYou: builder.query({
            query: () => ({
                url: '/songs/list-artist-top-tracks',
                method: "GET",
                params: { id: '40008598', locale: 'en-US' }
            }),
        }),
        getTopArtist: builder.query({
            query: () => ({
                url: '/songs/list-recommendations',
                method: "GET",
                params: { key: '484129036', locale: 'en-US' }
            }),
        }),
        getSongDetails: builder.query({
            query: (keys) => ({
                url: '/songs/get-details',
                method: "GET",
                params: { key: keys, locale: 'en-US' }
            }),
        })
    })
})

export const {
    useGetTopChartsQuery,
    useGetAroundYouQuery,
    useGetTopArtistQuery,
    useGetSongDetailsQuery,
} = shazamCoreApi 