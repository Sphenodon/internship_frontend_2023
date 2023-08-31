import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Avatar, Card, Carousel, Descriptions, Divider, Image, Switch, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {formatDate} from "../utils/formatDate";
import {useQuery} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
const { Paragraph } = Typography;
export default function Game(){
    const { gameId } = useParams()

    const axiosConfig = {
        url: 'game',
        method: 'GET',
        baseURL: 'https://free-to-play-games-database.p.rapidapi.com/api/',
        headers: {
            'X-RapidAPI-Key': '29c990ba65msh0fbd6850a7057dep1367cbjsn6ee5fcfc9496',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
        params: {
            id: gameId
        }
    };

    const {isLoading: loading, isLoadingError: loadingError, data: game} = useQuery(
        ['query-game-by-id', gameId],
         () => {
            return axios
                .create(axiosConfig)
                .get('/game')
                .then((res) => res.data)
        },
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 0,
            cacheTime: 1000 * 60 * 5,
            retry: 3,
        }
    )

    function createSystemRequirements (game) {
        if (game?.minimum_system_requirements === undefined) return
        const temp_data = []
        for (const [part_of_system, requirement] of Object.entries(game.minimum_system_requirements)) {
            const sr = {
                key: part_of_system,
                label: part_of_system,
                children: requirement
            }
            temp_data.push(sr)
        }
        return temp_data
    }

    return (
        !loadingError ? <>
            <Card
                className='gameCard'
                loading={loading}
            >
                <Meta
                    avatar={<Avatar size={64} src={game?.thumbnail} />}
                    title={game?.title}
                    description={formatDate(game?.release_date)}
                />
                <Typography className='gameCardInfo' >
                    <Paragraph>
                        <Paragraph>
                            <br/>
                            Publisher: {game?.publisher}
                            <br/>
                            Developer: {game?.developer}
                            <br/>
                            Genre: {game?.genre}
                        </Paragraph>
                        <Divider orientation='left'>Screenshots</Divider>
                        <Carousel autoplay>
                            {game?.screenshots.map((screenshot, index) => (
                                <div key={index}>
                                    <Image src={screenshot?.image}/>
                                </div>
                            ))}
                        </Carousel>
                        <Divider orientation='left'>Minimal system requirements</Divider>
                        <Descriptions
                            layout='vertical'
                            items={createSystemRequirements(game)}
                        />
                    </Paragraph>
                </Typography>
            </Card>
        </> : <Paragraph>Failed to retrieve the game</Paragraph>
    )
}