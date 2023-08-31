import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import {getCurrentPlatformState, getCurrentTagsState, getCurrentSortState} from '../features/games/gamesSlice';
import {Link} from 'react-router-dom';
import {Divider, Image, List, Skeleton, Typography} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import {formatDate} from "../utils/formatDate";
import {useQuery} from "react-query";
const { Paragraph } = Typography;

export default function Games() {
    const gamesPlatform = useSelector(getCurrentPlatformState);
    const gamesTags = useSelector(getCurrentTagsState);
    const gamesSort = useSelector(getCurrentSortState);

    const [games, setGames] = useState([]);
    const [currentSliceOfArray, setCurrentSliceOfArray] = useState(0)
    const [moreData, setMoreData] = useState([]);

    const axiosConfig = {
        url: gamesTags.length > 1 ? 'filter' : 'games',
        method: 'GET',
        baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api/',
        headers: {
            'X-RapidAPI-Key': '29c990ba65msh0fbd6850a7057dep1367cbjsn6ee5fcfc9496',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
        params: {
            platform: gamesPlatform,
            category: gamesTags.length > 1 || gamesTags.length === 0 ? null : gamesTags.toString(),
            tag: gamesTags.length > 1 ? gamesTags : null,
            'sort-by': gamesSort
        }
    };

    const {isLoading: loading, isLoadingError: loadingError} = useQuery(
        ['query-games-by-filter', {gamesPlatform, gamesTags, gamesSort}],
        () => {
            return axios
                .create(axiosConfig)
                .get(gamesTags.length > 1 ? 'filter' : 'games')
                .then((response) => {
                    setGames(response.data)
                    setMoreData([...response.data.slice(0, currentSliceOfArray+10)])
                    setCurrentSliceOfArray(10)
                    return response.data
                })

        },
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            cacheTime: 1000 * 60 * 5,
            retry: 3,
        }
    )

    function loadMoreData(){
        setMoreData([...moreData, ...games.slice(currentSliceOfArray, currentSliceOfArray+10)])
        setCurrentSliceOfArray(currentSliceOfArray+10)
    }

    return (
        !loadingError ? <Paragraph
            id="scrollableDiv"
            style={{
                height: '100vh',
                overflow: 'scroll',
            }}
        >
            <InfiniteScroll
                dataLength={moreData.length}
                next={loadMoreData}
                hasMore={moreData.length < games.length}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                scrollableTarget="scrollableDiv"
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            >
                <List
                    loading={loading}
                    dataSource={moreData}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            className='gameListItem'
                        >
                            <Image className='gameImage' src={item.thumbnail}/>
                            <Paragraph className='gameInfo'>
                                <Link to={`/game/${item.id}`}>{item.title}</Link>
                                <br/>
                                {formatDate(item.release_date)}
                                <br/>
                                {item.publisher}
                                <br/>
                                {item.genre}
                            </Paragraph>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </Paragraph> : <Paragraph>Failed to retrieve the game list</Paragraph>
    )
}