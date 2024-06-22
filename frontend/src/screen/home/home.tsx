import React, { useState } from 'react'
import './home.css'
import axios from 'axios'
import Lottie from "lottie-react";
import vs from "../../assets/vs.json";
import user from "../../assets/default.png";
import Table from 'react-bootstrap/Table';

export default function Home() {

    const [match, setMatch] = useState<any>([])
    const [count, setcount] = useState(0)
    const [inningNumber, setinningNumber] = useState(0)

    const getMatchData = async () => {
        const { data } = await axios.get("http://localhost:4400/api/v1/match/score")
        if (data.success) {
            setMatch(data?.data)
            console.log(data?.data)
            if (data.data?.scorecard?.innings[1]) {
                setinningNumber(1)
            } else {
                setinningNumber(0)
            }
        } else {
            alert(data.message)
        }

    }
    const MINUTE_MS = 30000;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setcount((count) => count + 1);
        }, MINUTE_MS);
        return () => {
            clearInterval(timer);
        };
    }, []);

    React.useEffect(() => {
        getMatchData()
    }, [count]);



    return (
        <div className='background-container'>
            <div style={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ flex: 0.2, }}>
                    <div style={{ display: 'flex', width: "100%", flexDirection: 'row', justifyContent: 'center', }}>
                        {
                            match.length != 0 && match?.matchPlayers?.teamPlayers[0]?.players.map((d: any, i: number) => {
                                const image = d?.player?.headshotImageUrl ? d?.player?.headshotImageUrl : d?.player?.imageUrl
                                const resImage = image ? "https://img1.hscicdn.com/image/upload/f_auto/lsci/" + image : user
                                return <div key={i + 1} style={{ backgroundColor: "blue", borderRadius: 50, margin: 10 }}>
                                    <img style={{ borderRadius: 50, width: 100, height: 100 }}
                                        src={resImage} />
                                </div>
                            })
                        }
                    </div>
                </div>
                <div style={{ display: 'flex', flex: 0.4, justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                    <div style={{ display: 'flex', margin: 10 }}>
                        <Table border={1} striped bordered hover>
                            <thead >
                                <tr>
                                    <th>Batting</th>
                                    <th>Wk Taker</th>
                                    <th>R</th>
                                    <th>B</th>
                                    <th>4s</th>
                                    <th>6s</th>
                                    <th>SR</th>

                                </tr>
                            </thead>
                            <tbody style={{ padding: 10 }}>
                                {match?.scorecard?.innings[inningNumber].inningBatsmen.map((d: any, i: any) => {
                                    return (
                                        <>
                                            {d.battedType == "yes" && <tr>
                                                <td>{d.player.name}</td>
                                                <td>{d?.dismissalBowler?.name ? d?.dismissalBowler?.name : "-"}</td>
                                                <td>{d.runs}</td>
                                                <td>{d.balls}</td>
                                                <td>{d.fours}</td>
                                                <td>{d.sixes}</td>
                                                <td>{d.strikerate}</td>
                                            </tr>}
                                        </>)
                                })}
                            </tbody>
                        </Table>

                        <div style={{ marginLeft: 40 }}>
                            <Table striped bordered hover>
                                <thead >
                                    <tr>
                                        <th>Bowler</th>
                                        <th>O</th>
                                        <th>M</th>
                                        <th>R</th>
                                        <th>W</th>
                                        <th>WD</th>
                                        <th>NB</th>
                                        <th>ECO</th>

                                    </tr>
                                </thead>
                                <tbody style={{ padding: 10 }}>
                                    {match?.scorecard?.innings[inningNumber].inningBowlers.map((d: any, i: any) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{d.player.name}</td>
                                                    <td>{d?.overs}</td>
                                                    <td>{d.maidens}</td>
                                                    <td>{d.conceded}</td>
                                                    <td>{d.wickets}</td>
                                                    <td>{d.wides}</td>
                                                    <td>{d.noballs}</td>
                                                    <td>{d.economy}</td>
                                                </tr>
                                            </>)
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>


                </div>
                <div style={{ flex: 0.2, }}>
                    <div style={{ display: 'flex', width: "100%", flexDirection: 'row', justifyContent: 'center', }}>
                        {
                            match.length != 0 && match?.matchPlayers?.teamPlayers[1]?.players.map((d: any, i: number) => {
                                const image = d?.player?.headshotImageUrl ? d?.player?.headshotImageUrl : d?.player?.imageUrl
                                const resImage = image ? "https://img1.hscicdn.com/image/upload/f_auto/lsci/" + image : user
                                return <div key={i + 1} style={{ backgroundColor: "red", borderRadius: 50, margin: 10 }}>
                                    <img style={{ borderRadius: 50, width: 100, height: 100 }}
                                        src={resImage} />
                                </div>
                            })
                        }
                    </div>
                </div>
                <div style={{ flex: 0.2, justifyContent: 'center', textAlign: 'center' }}>
                    {match?.scorecard ?
                        <div style={{ display: 'flex', flex: 0.2, justifyContent: 'space-around' }}>
                            {
                                match.length != 0 && <div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: 100, height: 100 }}
                                        src={`https://img1.hscicdn.com/image/upload/f_auto/lsci/${match?.scorecard?.innings[0]?.team?.imageUrl}`} />
                                    <p style={{ marginLeft: 20, marginRight: 20, fontSize: 25 }}>{`(${match?.scorecard?.innings[0]?.overs}) ${match?.scorecard?.innings[0]?.runs}/${match?.scorecard?.innings[0]?.wickets}`}</p>
                                </div>

                            }


                            <div style={{ height: 200, width: 200, marginLeft: match?.scorecard?.innings[0] ? -100 : 0 }}>
                                <Lottie animationData={vs} loop={true} />
                            </div>
                            {
                                match.length != 0 && <div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
                                    {match?.scorecard?.innings[1] && <p style={{ marginLeft: 20, marginRight: 20, fontSize: 25 }}>{`(${match?.scorecard?.innings[1]?.overs}) ${match?.scorecard?.innings[1]?.runs}/${match?.scorecard?.innings[1]?.wickets}`}</p>}
                                    {match?.scorecard?.innings[1] ? <img style={{ width: 100, height: 100 }}
                                        src={`https://img1.hscicdn.com/image/upload/f_auto/lsci/${match?.scorecard?.innings[1]?.team?.imageUrl}`} />
                                        : <img style={{ width: 100, height: 100, marginLeft: 20, marginRight: 20, }}
                                            src={`https://img1.hscicdn.com/image/upload/f_auto/lsci/${match?.match?.teams[1]?.team?.imageUrl}`} />

                                    }
                                </div>

                            }
                        </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {
                                match.length != 0 && <div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: 100, height: 100 }}
                                        src={`https://img1.hscicdn.com/image/upload/f_auto/lsci/${match?.match?.teams[0]?.team?.imageUrl}`} />
                                    :
                                </div>

                            }


                            <div style={{ height: 200, width: 200 }}>
                                <Lottie animationData={vs} loop={true} />
                            </div>
                            {
                                match.length != 0 && <div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>

                                    <img style={{ width: 100, height: 100 }}
                                        src={`https://img1.hscicdn.com/image/upload/f_auto/lsci/${match?.match?.teams[1]?.team?.imageUrl}`} />

                                </div>

                            }
                        </div>
                    }
                    {inningNumber == 0 ? <p>{match?.notes?.groups[0]?.notes[0]}</p> : <p>{match?.notes?.groups[1]?.notes[0]}</p>}
                    <p>{match?.match?.ground?.longName}</p>
                </div>

            </div>
        </div >
    )
}

