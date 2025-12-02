 <SheetContent className="bg-white border-l border-gray-200 w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-cyan-700 text-base flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-cyan-600" />
                      bet placement
                    </SheetTitle>
                    <SheetDescription className="text-gray-600 text-sm">
                      Enter amount for {selectedOption === "homeTeam" ? games.home_team : games.away_team}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-gray-700 text-sm">amount (₿)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600/30 focus:border-cyan-500 transition-all text-sm shadow"
                      />
                    </div>
                    
                    <Button
                      size="lg"
                      onClick={() => handlePledge(games.home_team, games.away_team, games.date)}
                      className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-700 border border-cyan-300 rounded-lg py-2 text-sm shadow hover:shadow-md transition-all duration-300"
                    >
                      🎯 confirm bet
                    </Button>
                  </div>
                </SheetContent>
  </div>




  // mysql commands   34.31.228.57
 // mysql --ssl-mode=REQUIRED --host=34.31.228.57 --user=root --password
 //git remote set-url origin git@github.com:capiyo/repository.git