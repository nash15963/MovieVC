/**
 * @jest-environment /Users/nash1/Desktop/MovieVC/client/test/Favorite.test.tsx
 */

import { render } from "@testing-library/react";
import WaitingListComponent from "../src/Components/WaitingListComponent";


describe('Heart component should work', () => {
    test('Heart should have a color',()=>{
        const movieId_testing = '800815'
        const mockData = {
            id : 800815 ,
            title : "淡藍之眸" ,
            originalTitle : "The Pale Blue Eye" ,
            overview : "退役刑警找來美國西點軍校生埃德加·愛倫·坡，兩人聯手調查校內發生的駭人命案謎團。" ,
            releaseDate : "2022-12-22" ,
            votePoints : 7.01 ,
            popularityPoints : 392.298 ,
            posterUrl : "https://image.tmdb.org/t/p/w500/rW49poda574LzxagVu5EIF4jLSe.jpg"
        } ;
        render(
            <WaitingListComponent videoData={mockData} movieId={movieId_testing}/>
        ) ;

        const heart = document.querySelector('.heart')
        
        if(heart){
            const style = window.getComputedStyle(heart)
            expect(style.backgroundColor).toBe('rgba(255, 0, 132)')
        }
        else{
            expect(true).toBe(false)
        }
    })
}) ;




// https://stackoverflow.com/questions/70440505/ts1343-the-import-meta-meta-property-is-only-allowed-when-the-module-opti

// npm install jest @types/jest;