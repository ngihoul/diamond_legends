# Algo Game Simulation

FUNCTION Pitch() :

    SI Strike || Foulball
        SI compte avec 2 strikes :
            batteur OUT
            Out++
            
            SI Out < 3
                NextHitter()

        SINON
            Strike++
            Pitch()

    SI Ball || WP || PB
        SI compte avec 3 balles
            Base on ball => hitter va en 1B
            
            SI runner en 1B
                avance en 2B

                SI runner en 2B
                    avance en 3B

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN

            NextHitter()

        SINON
            Ball++

    SI Hit
        SI flyball
            SI catch
                Hitter OUT
                Out++

                SI Out < 3
                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN
                    
                    NextHitter()

            SINON
                SI H
                    Runner va en 1B
                    NextHitter()

                    SI runner en 1B
                        avance en 2B

                        SI runner en 2B
                            Run++

                            SI isWalkOff()
                                RETURN

                            SI runner en 3B
                                Run++

                                SI isWalkOff()
                                    RETURN
                    
                    SI runner en 2B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 3B
                            Run++

                            SI isWalkOff()
                                RETURN

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN
                
                SI 2B
                    Runner va en 2B
                    NextHitter()

                    SI runner en 1B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 2B
                            Run++

                            SI isWalkOff()
                                RETURN

                            SI runner en 3B
                                Run++

                                SI isWalkOff()
                                    RETURN

                    SI runner en 2B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 3B
                            Run++

                            SI isWalkOff()
                                RETURN

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN

                SI 3B
                    Runner va en 3B
                    NextHitter()

                    SI runner en 1B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 2B
                            Run++

                            SI isWalkOff()
                                RETURN

                            SI runner en 3B
                                Run++

                                SI isWalkOff()
                                    RETURN

                    SI runner en 2B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 3B
                            Run++

                            SI isWalkOff()
                                RETURN

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN

                SI HR
                    SI runner en 1B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 2B
                            Run++

                            SI isWalkOff()
                                RETURN

                            SI runner en 3B
                                Run++

                                SI isWalkOff()
                                    RETURN

                    SI runner en 2B
                        Run++

                        SI isWalkOff()
                            RETURN

                        SI runner en 3B
                            Run++
                            
                            SI isWalkOff()
                                RETURN

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN
            
            NextHitter()
        
        SI groundball
            SI catch
                SI runner en 1B
                    Double play => runner OUT && Hitter OUT
                    Out + 2
                SINON
                    Hitter OUT
                    Out++

                SI Out < 3
                    NextHitter()
            
            SINON
                SI runner en 1B
                    runner va en 2B

                    SI runner en 2B
                        runner va en 3B
                    
                        SI runner en 3B
                            Run++

                            SI isWalkOff()
                                RETURN
                
                SI runner en 2B
                    Run++

                    SI isWalkOff()
                        RETURN

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN

                SI runner en 3B
                    Run++

                    SI isWalkOff()
                        RETURN
            
            NextHitter()
        
        SI sac bunt (uniquement si - de 2 outs)
            Hitter OUT

            SI runner en 1B
                runner va en 2B

                SI runner en 2B
                    runner va en 3B

                    SI runner en 3B
                        Run++

                        SI isWalkOff()
                            RETURN
            
            SI runner en 2B
                runner va en 3B

                SI runner en 3B
                    Run++

                    SI isWalkOff()
                        RETURN

            SI runner en 3B
                Run++

                SI isWalkOff()
                    RETURN


    SI Hit by pitch
        Hitter va en 1B

        SI runner en 1B
            runner va en 2B

            SI runner en 2B
                runner va en 3B
            
                SI runner en 3B
                    Run++

                    SI isWalkOff()
                        RETURN
        
        NextHitter()

// TODO
// Ajouter SB et CS ?
// Ajouter linedrive ?

#######################

FUNCTION NextHitter()
    strike = 0
    ball = 0

    SI Hitter précédent = 0 || 9 
        Hitter = 1
    SINON
        Hitter++

#######################

FUNCTION changeField() :
    Out = 0
    strike = 0
    ball = 0

    halfInning++

    SI halfInning < 18
        SI halfInning == 17 && runsHome > runsAway
            gameOver = true
        SINON
            switchTeam()
    SINON
        SI runsAway == runsHome
            switchTeam()
        SINON
            gameOver = true;

#######################µ

FUNCTION switchTeams() :
    SI defense = homeRoster
        defense = awayRoster[]
        offense = homeRoster[]
    SINON
        defense = homeRoster[]
        offense = awayRoster[]

#######################

FUNCTION isWalkOff():
    SI offense == homeRoster && halfInning >= 18 && runsHome > runsAway:
        gameOver = true

        RETURN true

    RETURN false

#######################

Match :

    gameOver = false;

    halfInning = 0
    strike = 0
    ball = 0
    out = 0

    defense = homeRoster[]
    offense = awayRoster[]

    runsAway = 0
    runsHome = 0

    Play ball !

    Pitcher = homeRoster[1];
    CurrentHitter = NextHitter()

    TANT QUE gameOver = false

        TANT QUE Out < 3 
            Pitch()
        FIN

        changeField()
    
    FIN

    // Gestion des coureurs