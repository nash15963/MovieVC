export interface movieBrief {
    id? :number ;
    title? : string ;
    originalTitle? : string
    overview? :string ;
    releaseDate ?: string ;
    votePoints?: number ;
    popularityPoints?:number ;
    posterUrl? :string ;
}

export interface movieDetail{
    id? :number ;
    title? : string ;
    originalTitle? : string
    overview? :string ;
    releaseDate ?: string ;
    votePoints?: number ;
    popularityPoints?:number ;
    posterUrl? :string ;
}

export interface randomMovie{
    id? :number ;
    title? : string ;
    original_title? : string ;
    backdrop_path?:string ;
}

export interface movieElementProps{
    movieCategory:string ;
    useHookData:movieBrief[] ;
}


// id id
// 中文電影名稱 title
// 英文電影名稱 original_title
// 簡介 overview
// 上映日期 release_date
// 投票分數 vote_average
// 人氣 popularity