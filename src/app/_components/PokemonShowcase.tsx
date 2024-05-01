import React from 'react';
import usePokemonQuery from "@/app/_hooks/usePokemonQuery";
import IconTurn from "@/app/_components/Icon-Turn";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import Skeleton from "@/app/_components/Skeleton";
import {switchSide} from "@/lib/features/pokemonSideSlice";
import IconChevronUp from "@/app/_components/Icon-ChevronUp";
import Link from "next/link";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";

function PokemonShowcase({pokemonId}: { pokemonId: number }) {
    const dispatch = useAppDispatch()
    const {data: pokemonData, isLoading: isPokemonLoading, isError: isPokemonError} = usePokemonQuery(pokemonId);
    const pokemonSide = useAppSelector((state: any) => state.pokemonSide.value)
    let nextPokemonId = parseInt(String(pokemonId)) + 1;
    console.log(pokemonSide)
    // if (isPokemonLoading)
    //     return (
    //         <div className="flex flex-col items-center justify-start my-10">
    //             <Skeleton className="h-[192px] w-[192px]"/>
    //             <button>
    //                 <Skeleton className="mt-6 w-8 h-8 transition-all duration-700 hover:rotate-0"/>
    //             </button>
    //         </div>
    //     )
    // // if (pokemonData)
    return (
        <section id="pokemon-showcase" className="w-full flex justify-between items-center ml-2">
            <Link href={`/pokemon/${pokemonId - 1}`}>
                <IconChevronUp className="w-12 h-12 cursor-pointer hover:bg-[--background-card] rotate-[-90deg]"/>
                <p className="font-medium">Previous <br/> Pokemon</p>
            </Link>
            {pokemonData
                ? <div id="pokemon-stripes" className="flex flex-col items-center justify-start">
                    {pokemonSide === 'front'
                        ? <img src={pokemonData.sprites.front_default} className="min-w-[192px]"
                               alt={`${pokemonData.name} front stripe`}/>
                        : <img src={pokemonData.sprites.back_default} className="min-w-[192px]"
                               alt={`${pokemonData.name} back stripe`}/>
                    }
                    <button onClick={() => dispatch(switchSide())}>
                        <IconTurn
                            className="rotate-[215deg] mt-6 w-6 h-6 transition-all duration-300 hover:text-[var(--foreground-card)]"/>
                    </button>

                </div>
                : <div className="flex flex-col items-center"><Skeleton className="h-[192px] w-[192px]"/>
                    <button>
                        <Skeleton className="mt-6 w-8 h-8 transition-all duration-700 hover:rotate-0"/>
                    </button>
                </div>
            }

            <Link href={`/pokemon/${nextPokemonId}`} className="flex flex-col items-center mr-2">
                <IconChevronUp className="w-12 h-12 cursor-pointer hover:bg-[--background-card] rotate-90"/>
                <p className="font-medium">Next <br/> Pokemon</p>
            </Link>
        </section>
    );
}

export default PokemonShowcase;