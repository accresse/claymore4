<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../css/font-awesome.min.css" type="text/css">
  <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css">
  <!-- 
   <link rel="stylesheet" href="../css/jqueryui-editable.css" type="text/css"/>
   -->
  <link rel="stylesheet" href="../jquery-ui-1.12.1.custom/jquery-ui.theme.css" type="text/css"/>
</head>
<body>
  <nav class="navbar navbar-expand-md bg-primary navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="/claymore"><i class="fa d-inline fa-lg fa-address-book"></i><b class="m-1">Claymore</b></a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent"
        aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
      <div class="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa d-inline fa-lg fa-bookmark-o"></i> Bookmarks</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa d-inline fa-lg fa-envelope-o"></i> Contacts</a>
          </li>
        </ul>
        <a class="btn navbar-btn ml-2 text-white btn-secondary"><i class="fa d-inline fa-lg fa-user-circle-o"></i> Sign in</a>
      </div>
    </div>
  </nav>
  <div class="py-0">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 "><span id="character_name">----------</span></h1>
        </div>
      </div>
    </div>
  </div>
  <div class="py-0">
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <p class="">Race: <span id="character_race">-----</span></p>
        </div>
        <div class="col-md-2">
          <p class="">Gender: <span id="character_gender">-----</span></p>
        </div>
        <div class="col-md-2">
          <p class="">Age: <span id="character_age">--</span></p>
        </div>
        <div class="col-md-2">
          <p class="">Height: <span id="character_height">--</span></p>
        </div>
        <div class="col-md-2">
          <p class="">Weight: <span id="character_weight">---</span> lbs</p>
        </div>
      </div>
    </div>
  </div>
  <div class="py-0">
    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a data-toggle="tab" href="#summary" class="active nav-link">Summary</a>
        </li>
        <li>
          <a data-toggle="tab" href="#details" class="nav-link">Details</a>
        </li>
        <li>
          <a data-toggle="tab" href="#inventory" class="nav-link">Inventory</a>
        </li>
        <li>
          <a data-toggle="tab" href="#xpShop" class="nav-link">XP Shop</a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="summary" class="tab-pane in active">
          <div class="row my-1">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header"> Level</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <h1 class="display-4 text-right" id="character_level">--</h1>
                    </div>
                    <div class="col-md-9">
                      <div class="row">
                        <div class="col-md-10 text-right font-weight-bold">Total XP:</div>
                        <div class="col-md-2 text-right" id="character_xp">--</div>
                      </div>
                      <div class="row">
                        <div class="col-md-10 text-right font-weight-bold">Unspent XP:</div>
                        <div class="col-md-2 text-right" id="character_unspentXp">--</div>
                      </div>
                      <div class="row">
                        <div class="col-md-10 text-right font-weight-bold">Spendable XP:</div>
                        <div class="col-md-2 text-right" id="character_spendableXp">--</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header"> Health </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-5">
                      <h1 class="display-4 text-right" id="character_currentHp">--</h1>
                    </div>
                    <div class="col-md-2">
                      <h1 class="display-4 text-center">/</h1>
                    </div>
                    <div class="col-md-5">
                      <h1 class="display-4 text-left" id="character_maxHp">--</h1>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="progress">
                        <div id="hpBar" class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">--%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header"> Saves</div>
                <div class="card-body m-0">
                  <table class="table m-0">
                    <thead>
                      <tr>
                        <th class="text-center">Might</th>
                        <th class="text-center">Fortitude</th>
                        <th class="text-center">Agility</th>
                        <th class="text-center">Will</th>
                        <th class="text-center">Identity</th>
                        <th class="text-center">Surprise</th>
                        <th class="text-center">Perception</th>
                        <th class="text-center">Passive ID</th>
                        <th class="text-center">Weight</th>
                        <th class="text-center">Max Lift</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_might" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_fortitude" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_agility" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_will" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_identity" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_surprise" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_perception" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_passiveId" value="--%"></button>
                        </td>
                        <td id="character_weightLimit" class="text-center">--</td>
                        <td id="character_maxLift" class="text-center">--</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-7">Attack</div>
                    <div class="col-md-2">MWS:
                      <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_mws" value="--%"></button>
                    </div>
                    <div class="col-md-2">BWS:
                      <button class="btn btn-outline-primary rollable_d100" title="Press to Roll" id="character_bws" value="--%"></button>
                    </div>
                    <div class="col-md-1">
                      <a href="#"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr class="text-center">
                        <th>Name</th>
                        <th>Hit</th>
                        <th>Damage</th>
                        <th>Speed</th>
                        <th>Attacks</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody id="attack_table">
                      <tr id="attack_template" class="text-center" style="display:none">
                        <td class="">
                          <a href="#" class="attack_name"></a>
                        </td>
                        <td>
                          <button class="btn btn-outline-primary attack_hit rollable_d100" title="Press to Roll" value="--%"></button>
                        </td>
                        <td>
                          <button class="btn btn-outline-primary attack_damage rollable_literal" title="Press to Roll" value="--"></button>
                        </td>
                        <td class="attack_speed">-</td>
                        <td class="attack_attacks">--</td>
                        <td>
                          <div class="btn-group border border-primary">
                            <button class="btn dropdown-toggle btn-link" data-toggle="dropdown"> <i class="fa d-inline fa-lg fa-exclamation-circle"></i> </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item attack_notes" href="#"></a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-11"> Defend </div>
                    <div class="col-md-1">
                      <a href="#"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr class="text-center">
                        <th>Active</th>
                        <th>Name</th>
                        <th>Ad</th>
                        <th>Aa</th>
                        <th>T</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="text-center">
                        <td>
                          <input type="checkbox" value="on"> </td>
                        <td>
                          <a href="#">Natural</a>
                        </td>
                        <td>12</td>
                        <td>0</td>
                        <td>1</td>
                        <td>
                          <div class="btn-group border border-primary">
                            <button class="btn dropdown-toggle btn-link" data-toggle="dropdown"> <i class="fa d-inline fa-lg fa-exclamation-circle"></i> </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">A really long note about all the things you can do, including:
                                <ul>
                                  <li>range</li>
                                  <li>reach</li>
                                  <li>magical properties</li>
                                </ul>
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td>
                          <input type="checkbox" value="on"> </td>
                        <td>
                          <a href="#">Armor</a>
                        </td>
                        <td>12</td>
                        <td>0</td>
                        <td>1</td>
                        <td>
                          <div class="btn-group border border-primary">
                            <button class="btn dropdown-toggle btn-link" data-toggle="dropdown"> <i class="fa d-inline fa-lg fa-exclamation-circle"></i> </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">A really long note about all the things you can do, including:
                                <ul>
                                  <li>range</li>
                                  <li>reach</li>
                                  <li>magical properties</li>
                                </ul>
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td>
                          <input type="checkbox" value="on"> </td>
                        <td>
                          <a href="#">Shield</a>
                        </td>
                        <td>12</td>
                        <td>0</td>
                        <td>1</td>
                        <td>
                          <div class="btn-group border border-primary">
                            <button class="btn dropdown-toggle btn-link" data-toggle="dropdown"> <i class="fa d-inline fa-lg fa-exclamation-circle"></i> </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="#">A really long note about all the things you can do, including:
                                <ul>
                                  <li>range</li>
                                  <li>reach</li>
                                  <li>magical properties</li>
                                </ul>
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="text-center table-active font-weight-bold">
                        <td class=""></td>
                        <td>TOTAL</td>
                        <td>12</td>
                        <td>0</td>
                        <td>1</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Fighter" style="display:none;"></div>
          <div id="section_Thief" class="row my-1" style="display:none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header"> Thief</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table m-0">
                        <thead>
                          <tr>
                            <th class="text-center">Prest.</th>
                            <th class="text-center">Stealth</th>
                            <th class="text-center">Mech.</th>
                            <th class="text-center">MD</th>
                            <th class="text-center">SSS</th>
                            <th class="text-center">Perc.</th>
                            <th class="text-center">DN</th>
                            <th class="text-center">Track</th>
                            <th class="text-center">Max Lift</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                            <td class="text-center">
                              <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-2 text-right font-weight-bold">Hit Bonus: </div>
                        <div class="col-md-2 text-left">+10%</div>
                        <div class="col-md-2 text-right font-weight-bold">Multiplier:</div>
                        <div class="col-md-2 text-left">x2</div>
                        <div class="col-md-2 text-right font-weight-bold">Kill %:</div>
                        <div class="col-md-2 text-left">
                          <a href="#" class="btn btn-outline-primary" title="Press to Roll">10%</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Wizard" class="row my-1" style="display:none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header"> Wizard</div>
                <div class="card-body">
                  <p class=" p-y-1">(Pencil and paper for now) </p>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Priest" class="row my-1" style="display:none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header"> Priest</div>
                <div class="card-body">
                  <p class=" p-y-1">(Pencil and paper for now) </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header"> Martial Skills</div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">Fighting Blind</a>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Brute Fighting</a>
                        </td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">2 Handed Weapons</a>
                        </td>
                        <td>10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header"> Non-Martial Skills</div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Check</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">Strength of Character</a>
                        </td>
                        <td>
                          <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Run</a>
                        </td>
                        <td>
                          <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Mighty</a>
                        </td>
                        <td>
                          <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Mountaineering</a>
                        </td>
                        <td>
                          <a href="#" class="btn btn-outline-primary" title="Press to Roll">40%</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="details" class="tab-pane">
		  <div class="py-0">
		    <div class="container" id="raw_div"></div>
		  </div>
        </div>
        <div id="inventory" class="tab-pane">
		  <div class="py-0">
	          <div class="container" id="inventory_div"></div>
	      </div>
        </div>
        <div id="xpShop" class="tab-pane">
		  <div class="py-0">
          	<p> Coming Soon 2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="../jquery-ui-1.12.1.custom/external/jquery/jquery.js"></script>
  <script src="../jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
  <script src="../js/popper.min.js"></script>
  <script src="../js/bootstrap.min.js"></script>
  <!-- 
  <script src="../js/jqueryui-editable.min.js"></script>
   -->
  <script src="../js/claymore.js"></script>
  <!-- 
   <pingendo onclick="window.open('https://pingendo.com/', '_blank')" style="cursor:pointer;position: fixed;bottom: 10px;right:10px;padding:4px;background-color: #00b0eb;border-radius: 8px; width:110px;display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:14px;color:white">made with&nbsp;&nbsp;
    <img src="https://pingendo.com/site-assets/Pingendo_logo_big.png" class="d-block" alt="Pingendo logo" height="16">
  </pingendo>
 -->
</body>

</html>