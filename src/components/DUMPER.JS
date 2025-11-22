<Card
      className={cn(
        "relative m-3  sm:w-[400px] backdrop-blur-sm border-border/50 bg-gradient-to-br from-card/90 to-card/50 hover:shadow-glow transition-all duration-300 animate-slideUp",
        featured && "ring-2 ring-primary shadow-pink"
      )}
    >
      {/* Tournament Badge */}
      <div className="flex items-center justify-between p-1 border-b border-border/50">
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-[#300669]" />
          <span className="text-sm font-medium text-muted-foreground">{games.league}</span>
        </div>
        {isLive && (
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground animate-pulse">
            <Zap className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        )}
      </div>

      {/* Match Details */}
      <div className="">
        {/* Teams */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <img  className="rounded-full" src={ball}/>
              </div>
              <div>
                
                <p className="font-semibold text-foreground">{games.home_team}</p>
                <p className="text-xs text-muted-foreground">{games.home_win}</p>
              </div>
            </div>
          </div>
          
          <div className="px-4">
            <span className="text-xl font-bold bg-gradient-to-r from-[#300669] to-accent bg-clip-text text-transparent">vs</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <p className="font-semibold text-foreground">{games.away_team}</p>
                <p className="text-xs text-muted-foreground">{games.away_win}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{games.day}, {games.date}</span>
        </div>

        {/* Betting Options */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-primary/10 hover:border-primary">
            <span className="text-xs text-muted-foreground mb-1">Home Win</span>
            <span className="text-lg font-bold text-[#300669]">45</span>
          </Button>
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-accent/10 hover:border-accent">
            <span className="text-xs text-muted-foreground mb-1">Draw</span>
            <span className="text-lg font-bold text-accent">45</span>
          </Button>
          <Button variant="social" className="flex flex-col h-auto py-1 hover:bg-primary/10 hover:border-primary">
            <span className="text-xs text-muted-foreground mb-1">Away Win</span>
            <span className="text-lg font-bold text-[#300669]">78</span>
          </Button>
        </div>

        {/* Pledge Button */}
         <div className="space-y-2 space-x-2">
           <Sheet  >
                <SheetTrigger className="w-full "> <Button variant="gradient" size="sm" className="flex-1">
                            pledge bet
                          </Button></SheetTrigger>


                <SheetContent  className="sm:w-screen lg:w-[400px] h-[200px] rounded-lg right-0" side="bottom">
                   <SheetHeader>
                    <SheetTitle>pledge amount</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                  </SheetHeader>
                  <form  className="ml-4 mr-4"  onSubmit={()=>submitAmount(games.homeTeam,games.awayTeam,games.date,games.day)} >

                      <div className="">
                        <div>
                          <div>Select your team</div>
                          <div className="flex flex-row justify-between  ">
                          <div className={`${back1} rounded-lg p-1`}  onClick={(event)=>changeBackground1("homeTeam")}>{games.home_team}</div>
                          vs
                          <div className={`${back2} rounded-lg p-1`} onClick={(event)=>changeBackground2("awayTeam")}>{games.away_team}</div>
                          </div>

                        </div>



                                   
                                    <input 
                                    value={amount}
                                    onChange={handleChange}
                                    tt-2
                                      type="text" 
                                      className="w-full p-1 border rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent"
                                      placeholder="ksh:100"
                                    />
                                  </div>
                                 
                                  <div>
                                  
                                  </div>
                                     
                        <Button onClick={()=>submitAmount(games.home_team,games.away_team,games.date)}  type="submit" variant="gradient" className=" mt-2 w-full" size="sm">
                                  <DollarSign className="w-4 h-4 mr-2" />
                                submit
                                </Button>
                       
                      
                  
                  
                  
                                  </form>
















                   {/* Specify 'right' for the side property */}
                 
                  {/* Add your content here */}
                </SheetContent>
              </Sheet>
        </div>

        {/* Social Interactions */}
        <div className="flex items-center justify-between  border-t border-border/50">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Heart className="w-4 h-4 mr-1" />
              56
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <MessageCircle className="w-4 h-4 mr-1" />
              78
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
            <TrendingUp className="w-4 h-4 mr-1" />
            Stats
          </Button>
        </div>
      </div>
    </Card>)