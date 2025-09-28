"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWap, setIsWap] = useState(false);
  const [isTv, setIsTv] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsWap(width < 240);
      setIsTv(width >= 1921);
      
      // on big screens menu always opened
      if (width >= 640) {
        setMobileOpen(true);
      } else {
        setMobileOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`flex flex-col sm:flex-row min-h-screen bg-[#c0c0c0] ${isWap ? 'text-[8px]' : ''} ${isTv ? 'max-w-[1600px] mx-auto' : ''}`}>
      {/*burger for mobile*/}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden fixed top-2 left-2 z-50 text-white bg-blue-800 p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800"
          style={{ 
            boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff'
          }}
        >
          {mobileOpen ? "☭" : "卐"}
        </button>
      )}

      {/*navpan*/}
      <nav 
        className={`bg-gray-300 text-black border-r-2 border-r-gray-800 border-b-2 border-b-gray-800 sm:w-64 sm:min-w-[16rem] w-full sm:sticky fixed top-0 z-40 transition-transform duration-300 h-screen overflow-y-auto ${
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'
        } ${isTv ? 'w-80 min-w-[20rem]' : ''}`}
      >
        {/*head*/}
        <div className="bg-gradient-to-b from-black to-blue-900 text-white p-2 border-b-2 border-b-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="text-center flex-grow">
              {!isWap && (
                <div className="text-xs font-bold uppercase tracking-wider mb-1 font-mono italic whitespace-nowrap overflow-hidden text-ellipsis">
                  UNITED MUNICIPALITY<br />OF ENKELINLINNA
                </div>
              )}
              <h1 className="text-sm sm:text-base font-bold leading-tight uppercase font-mono italic break-words">
                {isWap ? (
                  "U.M.S-M."
                ) : (
                  <>CITY<br />OF SAINT-MICHAEL</>
                )}
              </h1>
              <div className="text-xs mt-2 font-mono italic">
                SINCE 1644
              </div>
            </div>
          </div>
        </div>

        {/*menu*/}
        <div className="bg-gray-300 p-1">
          <ul className="flex flex-col space-y-1 text-xs font-bold">
            
            {/*homepage*/}
            <li>
              <Link href="/" className="block px-2 py-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 
              border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}>
                HOMEPAGE
              </Link>
            </li>

            {/*about city*/}
            <li>
              <button
                onClick={() => toggleMenu("about")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">ABOUT MUNICIPALITY</span>
                <span>{openMenu === "about" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "about" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/about/history" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HISTORY</a></li>
                  <li><a href="/about/geography" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>GEOGRAPHY</a></li>
                </ul>
              )}
            </li>

            {/*city government*/}
            <li>
              <button
                onClick={() => toggleMenu("council")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">{isWap ? "GOVERNMENT" : "GOVERNMENT"}</span>
                <span>{openMenu === "council" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "council" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/government/administration" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>ADMINISTRATION</a></li>
                  <li><a href="/government/council" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>{isWap ? "COUNCIL" : "COUNCIL"}</a></li>
                </ul>
              )}
            </li>

            

            {/*emergency services*/}
            <li>
              <button
                onClick={() => toggleMenu("emergency")}
                className="flex items-center justify-between w-full px-2 py-1 bg-blue-800 text-white border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-blue-900 transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">EMERGENCY</span>
                <span>{openMenu === "emergency" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "emergency" && (
                <ul className="ml-4 mt-1 space-y-1 bg-red-200 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/emergency/police" className="block px-2 py-1 text-xs bg-blue-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>POLICE</a></li>
                  <li><a href="/emergency/defense" className="block px-2 py-1 text-xs bg-blue-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEFENSE</a></li>
                  <li><a href="/emergency/medical" className="block px-2 py-1 text-xs bg-blue-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>MEDICAL</a></li>
                </ul>
              )}
            </li>

            {/*contacts*/}
            <li>
              <button
                onClick={() => toggleMenu("contacts")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">CONTACTS</span>
                <span>{openMenu === "contacts" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "contacts" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/contacts/reception" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>RECEPTION</a></li>
                  <li><a href="/contacts/departments" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEPARTAMENTS</a></li>
                  <li><a href="/contacts/hotline" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HOTLINE</a></li>
                </ul>
              )}
            </li>
          </ul>

          {/*footer*/}
          <div className="p-2 border-t-2 border-t-gray-800 border-l-2 border-l-white bg-gray-300 text-xs text-center mt-2 border-r-2 border-r-gray-800 border-b-2 border-b-white">
            <div className="text-red-800 font-bold mb-2 font-mono italic uppercase break-words">
              STATE OF EMERGENCY: 7778 DAYS UNDER MARTIAL LAW PROVISIONS.
            </div>
            <div className="text-gray-800 font-mono italic uppercase break-words">
              © 1991-1998. City of Santa-Michael, Enkelinlinna United Municipality, Aurinfjall Republic
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-4 sm:ml-0 mt-12 sm:mt-0">
        <div className="bg-white border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/*city history*/}
            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-3">
              <h2 className="text-lg font-bold text-[#000080] font-mono mb-2 border-b border-gray-600 pb-1">
                HISTORY OF SAINT-MICHAEL (SANTA-MIKAEL) #1/98
              </h2>
              <div className="space-y-2">
                <div className="bg-white border text-black border-gray-400 p-2">
                    <p className="text-xs font-mono font-bold italic">FOUNDATION OF THE CITY...</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image 
                    src="/santa_michael.png"
                    width={600}
                    height={400}
                    className="width-full height-88 object-cover"
                    alt="Santa Mikael inno 1887 gadams"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The city of Saint-Michael (Santa-Mikael) was founded in 1644 by settlers from the Leon Empire.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The settlers earned their living by raising livestock, and in 1702 the first printing press in the Viceroyalty of Nueva Andalus was opened. 
                    In 1817, when the independence of the United States of Nueva Andalus (from 1821 — United States of Leon) was declared, Hurricane Mohammed devastated the city.
                    The photograph above dates back to 1859, when the Aurinfjäll State Legislature decided to grant Santa Mikael city status. At the time, it had a population of 138.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">AURINFJALL LIBERATION WAR</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The North Aurinfjall Army, led by Colonel Martin Lawrence, captured Santa Mikael on November 18, 1847, after the Battle of the Seven Red Hills. 
                      2,428 soldiers of the North Aurinfjall Army of the Andreaslinn Armed Forces became martyrs for the reunification of the Aurinfjall colonists with their homeland.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">On February 5, 1848, the Constitutional Convention of the Republic of Aurinfjall adopted the Act of Reunification of Aurinfjall and Andreaslinna. 
                      Santa Mikael became the temporary capital of the state of Aurinfjall, housing the residences of the governor, vice-governor, and the state legislative assembly. 
                      </p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">On July 11, 1849, the Aurinfjäll State Constitutional Assembly adopted the state constitution. 
                      The state administration moved to Sakkjärvi, and Santa Mikael became a town in Enkelinlinna United Municipality.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">CIVIL WAR IN ANDREASLINNA (1862-1868)</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">Before the outbreak of the Civil War, a Technical College (now the National Technical University of Enkelinlinna) was established in Santa Mikael.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image
                    src="/kurilla.png"
                    width={600}
                    height={400}
                    alt="Marshal Kurilla in 1867"
                    className="w-88 h-auto object-cover"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">In 1860, Lincoln Kurilla, a supporter of slave emancipation and secretary general of the Republican People Party, was elected president. 
                    In April 1862, the 19th Santa Mikaela Mountain Regiment was organized from volunteers, fighting on the side of the Republic against the Confederates. 
                    On December 15 of that same year, the Eighth Regiment was created, named after Martino Lawrence, a hero of the state of Aurinfjall and the state&apos;s first governor. 
                    Most of the volunteers (4,467 out of 8,221) died in the bloody fratricidal war that lasted six years.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">RECONSTRUCTION OF ANDREASLINNA</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image
                    src="/earthquake.png"
                    width={600}
                    height={400}
                    alt="Earthquake in 1874"
                    className="w-full h-88 object-cover"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The city population began to decline with the liberation of the South from the scourge of slavery. 
                      In 1874, the Great Aurinthjall Earthquake struck, measuring 9.3 in magnitude. Most of the city residents (17,338 out of a prewar population of 35,906 in 1874) perished in the earthquake. 
                      By the end of reconstruction in 1880, Santa Mikael population had dropped to just 4,114.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">On February 19, 1878, the railway station, which would become one of the largest in the county, opened. At 7:35 PM, the express passenger train 
                      &#34;Margaret Andersen&#34; named after Hommlange&#39;s first female mayor, departed from Santa Mikael for Hommlang (in the Free People&#39;s State of Hjaalmark, now simply the state of Hjaalmark).</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">FIRST GREAT WAR (1914-1919)</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image
                    src="/islamic.png"
                    width={600}
                    height={400}
                    alt="First Great War"
                    className="w-full h-88 object-cover"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">By the start of the First Great War, Santa Mikael was a thriving industrial town—the population had already reached its pre-war level by 1907. 
                      The town had two coal-fired power plants, nineteen schools (nine elementary, six secondary, three academic higher public schools, and one vocational higher public school), 
                      a mountain rifle regiment of the state National Guard, seven police stations, thirteen factories, and a newspaper, the &ldquo;City Herald of the Red Hills.&ldquo; A sausage factory opened in April 1914. 
                      The town budget in July 1914 was fourteen million crowns.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">With the outbreak of the First Great War in August 1914, the Andreaslinna federal government took no steps to enter the war.
                    On August 18, 1914, at an emergency meeting of the Senate and Assembly of the State Legislature, a decision was made to mobilize the Aurinfjall National Guard to patrol the state&rsquo;s territories.
                    In early October of that year, pro-Rhenish activists staged blood massacre against the Polanian residents of the city, who constituted the majority at the time. Street battles broke out in the city, 
                    which ended with the intervention of the Enkelinlinna police and the state National Guard. 
                    Unfortunately, 1,702 people died during the fighting, forcing the state government to appeal to the federal government to enter the war against the Rhenish Reich.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">On January 29, 1915, the 318th Special Purpose Mountain Rifle Brigade &#34;Konung Ingvar the Red&#34; of the Aurinfjall State National Guard was formed. 
                      At the time, the Aurinfjall people used the Skogdan language, written in Heian characters (photographed above with the flag). 
                      The brigade recruited people from the mountainous regions; lowland Aurinfjall residents were barred from joining 
                      (in October 1917, the state Constitutional Court ruled this ban unconstitutional and unrelated to all military regulations of the state National Guard).</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">February 1917 marked the imposition of martial law throughout Andreaslinna due to the country&rsquo;s entry into the Great War. 
                      The 318th Special Mountain Rifle Brigade was sent to Gila to prepare for deployment to the Western Front of the Great War.
                    During its service in the Great War, this unit lost up to 93% of its personnel. Of the 37,509 mobilized personnel who served in the brigade, only 2,627 returned home unharmed.</p>
                    <p className="text-xs font-mono italic"> </p>
                </div>
              </div>
            </div>
           <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-3">
              <h2 className="text-lg font-bold text-[#000080] font-mono mb-2 border-b border-gray-600 pb-1">
                #2/98
              </h2>
              <div className="space-y-2">
                <div className="bg-white border text-black border-gray-400 p-2">
                  <p className="text-xs font-mono font-bold italic">INTERBELLUM...</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image
                    src="/1922.png"
                    width={600}
                    height={400}
                    alt="January 1922, SM"
                    className="w-full h-88 object-cover"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">After the end of the First (then simply known as the Great) War, 
                    Santa Micael began to transform. County officials decided not to impose prohibition, but instead to open more and more alcohol-producing businesses.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">In the 1923 city council elections, all seats were won by Republicans, who continued the policies of the Democrats.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">On October 15, 1929, Theodore Richtow, mayor of Santa Micaela, a hero of the Great War, and colonel of the Andreaslinna army, was shot dead by a group of communists led by Leon McCormick. 
                    On February 1, 1930, McCormick was beheaded along with his family by the city&#39;s military court.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">From 1931 to 1938, Santa Mikael was a very peaceful town. Numerous businesses, educational institutions, and several clinics emerged. 
                    The Aurinfjall government named the town &#34;Town of the Year&#34; for eight consecutive years for its exemplary urban order.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">ANDREASLINNA IN THE II GREAT WAR</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The Republic of Andreaslinna entered the Second Great War on the side of the Allied Powers after the Heian Imperial Air Force attacked Aloulah Air Base on November 24, 1941. 
                    At the time of the Heian attack, the city was home to the 15th Airborne Division, the 131st Military Police Regiment, and the 229th Marine Brigade. 
                    These three units numbered over 50,000 troops, out of a city population of 66,000 (the city&#39;s total population, of course, was at least 116,000-120,000).</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">Martial law was declared in Aurinfjäll State on December 2, 1941, the day after the Heian terrorists bombed Enkelinlinna. 
                    The day after the signing of the Martial Law Act, a meeting of the state&#39;s military high command and the Western Army Group of the Andreaslinna Armed Forces took place in Santa Mikaela.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">The western shore of Andreaslinna was declared a war zone, and our city was no exception. 
                    Of the 121,066 people who lived in the city by 1943, only 57,000 remained due to appalling living conditions. The city entire economy was converted to a wartime economy. This continued until March 1944.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <Image
                    src="/1943.png"
                    width={600}
                    height={400}
                    alt="1943, City Hall"
                    className="w-full h-88 object-cover"
                    />
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">After March 1944, when the coastal bombing ended, the city began to re-establish peacetime conditions. 
                      On October 2, 1946, the City Council instituted the Council Medal &#34;For Victory in the Second Great War.&#34; Of the 121,066 people who lived there before the war, more than 9,000 perished.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">WHAT ABOUT TODAY?</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">Today Santa-Mikael has a population of 97 thousand and is approaching one hundred thousand. The Republican National Party&#30;s monopoly, 
                      which ended with the National Liberals victory in the 1967 city council elections, has long since ended. Today, the city has changed for the better.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono italic">Finally, in July 1990, the Enkelinlinna Metro finally reached our city. As of April 1998, nineteen stations on five lines were open throughout the city. 
                      Organized crime, which some radical political forces were involved in and continue to be involved in, remains the city main problem. 
                      Thanks to the efforts of the Orange National Front (a volunteer paramilitary organization founded with the support of the city council in 1976) and law enforcement, this problem is gradually being addressed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}