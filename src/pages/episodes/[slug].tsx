import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router'
import { api } from '../../services/api'

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    description: string;
    publishedAt: string;
    durationAsString: string;
    url: string;
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({ episode}: EpisodeProps){
    const router = useRouter();
    return (
        <h1>{episode.id}</h1>
    )
}

export const getStaticPaths : GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
     const { data } = await api.get(`/episodes/${slug}`)
    
    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
        duration: Number(data.file.duration),
        // durationAsString: convertDurationToTimeString(Number(episode.file.duration)),

        url: data.file.url,
      }
    return{
        props: {},
        revalidate: 60 * 60 * 24, //refresh every 24 hours
    }
}