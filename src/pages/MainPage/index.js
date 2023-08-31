import Games from "../../components/Games";
import GameFilters from "../../components/GameFilters";
import './index.css'

function MainPage(){
    return (
        <>
            <GameFilters/>
            <Games/>
        </>
    )
}

export default MainPage