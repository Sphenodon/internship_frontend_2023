import {createSlice} from '@reduxjs/toolkit';

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        platform: 'all',
        tags: [],
        sort_by: null,
    },
    reducers: {
        selectPlatform: (state, action) => {
            state.platform = action.payload
        },
        addTag: (state, action) => {
            state.tags.push(action.payload)
            console.log(action.payload)
        },
        removeTag: (state, action) => {
            state.tags.splice(state.tags.findIndex(i => i === action.payload),1)
        },
        selectSort: (state, action) => {
            state.sort_by = action.payload
        },
        setGames: (state, action) => {
            state.games = action.payload
        }
    }
});

export const getGamesState = (state) => state.games.games;
export const getCurrentPlatformState = (state) => state.games.platform;
export const getCurrentTagsState = (state) => state.games.tags;
export const getCurrentSortState = (state) => state.games.sort_by;
export const {selectPlatform, addTag, selectSort, removeTag, setGames} = gamesSlice.actions;

export default gamesSlice.reducer;
