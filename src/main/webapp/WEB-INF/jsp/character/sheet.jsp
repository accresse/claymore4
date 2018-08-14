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
<link rel="stylesheet" href="../jquery-ui-1.12.1.custom/jquery-ui.theme.css" type="text/css" />
<style>
input[type='checkbox'].icon-checkbox{display:none}
input[type='checkbox'].icon-checkbox+label .unchecked{display:inline}
input[type='checkbox'].icon-checkbox+label .checked{display:none}
input[type='checkbox']:checked.icon-checkbox{display:none}
input[type='checkbox']:checked.icon-checkbox+label .unchecked{display:none}
input[type='checkbox']:checked.icon-checkbox+label .checked{display:inline}
</style>                  
</head>
<body>
  <nav class="navbar navbar-expand-md bg-primary navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="/claymore"><i class="fa d-inline fa-lg fa-address-book"></i><b class="m-1">Claymore</b></a><span class="navbar-brand"> / </span><a class="navbar-brand" href="/claymore/characterList.html">Characters</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
        <button id="level_up_button" class="btn btn-sm navbar-btn ml-2 text-white btn-warning"><i class="fa d-inline fa-lg fa-arrow-circle-up"></i> Level Up</button>
        <button id="save_character_button" class="btn btn-sm navbar-btn ml-2 text-white btn-success"><i class="fa d-inline fa-lg fa-user"></i> Save</button>
        <button id="clone_character_button" class="btn btn-sm navbar-btn ml-2 text-white btn-info"><i class="fa d-inline fa-lg fa-users"></i> Clone</button>
        <button id="delete_character_button" class="btn btn-sm navbar-btn ml-2 text-white btn-danger"><i class="fa d-inline fa-lg fa-user-times"></i> Delete</button>
      </div>
      <span class="navbar-brand"></span>
      <span id="user" class="navbar-brand"></span>
    </div>
  </nav>
  <div class="py-0">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 ">
            <span id="character_name">----------</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="py-0">
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <p class="">
            Race: <span id="character_race">-----</span>
          </p>
        </div>
        <div class="col-md-2">
          <p class="">
            Gender: <span id="character_gender">-----</span>
          </p>
        </div>
        <div class="col-md-2">
          <p class="">
            Age: <span id="character_age">--</span>
          </p>
        </div>
        <div class="col-md-2">
          <p class="">
            Height: <span id="character_height">--</span>
          </p>
        </div>
        <div class="col-md-2">
          <p class="">
            Weight: <span id="character_weight">---</span> lbs
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="py-0">
    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item"><a data-toggle="tab" href="#summary" class="active nav-link">Summary</a></li>
        <li><a data-toggle="tab" href="#details" class="nav-link">Details</a></li>
        <!-- 
        <li>
          <a data-toggle="tab" href="#inventory" class="nav-link">Inventory</a>
        </li>
         -->
        <li><a data-toggle="tab" href="#xpShop" class="nav-link">XP Shop <span class="badge badge-pill badge-danger remaining_xp"></span></a></li>
        <li><a data-toggle="tab" href="#skillShop" class="nav-link">Skill Shop <span class="badge badge-pill badge-danger remaining_skill"></span></a></li>
        <li><a data-toggle="tab" href="#rogueShop" class="nav-link">Rogue Shop <span class="badge badge-pill badge-danger remaining_rogue"></span></a></li>
        <li><a data-toggle="tab" href="#json" class="nav-link">JSON</a></li>
      </ul>
      <div class="tab-content">
        <div id="summary" class="tab-pane in active">
          <div class="row my-1">
            <div class="col-md-6">
              <div class="card" style="height: 100%;">
                <div class="card-header">Level</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-3">
                      <h1 class="display-4 text-right character_level" id="character_level">--</h1>
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
                        <div class="col-md-2 text-right remaining_xp" id="character_spendableXp">--</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">Health</div>
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
                <div class="card-header">Saves</div>
                <div class="card-body m-0">
                  <table class="table table-sm m-0">
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
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_might" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_fortitude" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_agility" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_will" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_identity" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_surprise" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_perception" value="--%"></button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_passiveId" value="--%"></button>
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
                    <div class="col-md-2">
                      MWS<a id="character_mws_plan" href="#"><sup>[?]</sup></a>:
                      <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_mws" value="--%"></button>
                    </div>
                    <div class="col-md-2">
                      BWS<a id="character_bws_plan" href="#"><sup>[?]</sup></a>:
                      <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_bws" value="--%"></button>
                    </div>
                    <div class="col-md-1">
                      <a href="#" data-toggle="modal" data-target="#attackModal" data-title="New Attack"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <table class="table table-sm">
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
                      <tr id="attack_template" class="text-center" style="display: none">
                        <td class=""><a href="#" class="attack_name" data-toggle="modal" data-target="#attackModal" data-title="Edit Attack"></a><a href="#"><sup class="attack_plan">[?]</sup></a></td>
                        <td>
                          <button class="btn btn-sm btn-outline-primary attack_hit rollable_d100" title="Press to Roll" value="--%"></button>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-outline-primary attack_damage rollable_literal" title="Press to Roll" value="--"></button>
                        </td>
                        <td class="attack_speed">-</td>
                        <td class="attack_attacks">--</td>
                        <td>
                          <div class="btn-group border border-primary">
                            <button class="btn btn-sm dropdown-toggle btn-link" data-toggle="dropdown">
                              <i class="fa d-inline fa-lg fa-exclamation-circle"></i>
                            </button>
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
                    <div class="col-md-11">Defend</div>
                    <div class="col-md-1">
                      <a href="#" data-toggle="modal" data-target="#defenseModal" data-title="New Defense"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <table class="table table-sm">
                    <thead>
                      <tr class="text-center">
                        <th>Active</th>
                        <th>Name</th>
                        <th>Ad</th>
                        <th>Ad Mod</th>
                        <th>Aa</th>
                        <th>T</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody id="defense_table">
                      <tr id="defense_template" class="text-center" style="display: none">
                        <td><input type="checkbox" class="defense_active" value="on" checked="checked"></td>
                        <td class="defense_name_cell"><a href="#" class="defense_name" data-toggle="modal" data-target="#defenseModal" data-title="Edit Defense">--</a></td>
                        <td class="defense_ad">--</td>
                        <td class="defense_adMod">--</td>
                        <td class="defense_aa">--</td>
                        <td class="defense_t">--</td>
                        <td class="defense_notes_cell">
                          <div class="btn-group border border-primary">
                            <button class="btn btn-sm dropdown-toggle btn-link" data-toggle="dropdown">
                              <i class="fa d-inline fa-lg fa-exclamation-circle"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item defense_notes" href="#">--</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr id="defense_total" class="text-center table-active font-weight-bold">
                        <td></td>
                        <td>TOTAL</td>
                        <td class="defense_ad">--</td>
                        <td class="defense_adMod">--</td>
                        <td class="defense_aa">--</td>
                        <td class="defense_t">--</td>
                        <td></td>
                      </tr>
                      <tr id="defense_total_sum" class="text-center table-active font-weight-bold text-primary">
                        <td></td>
                        <td></td>
                        <td id="defense_sum_ad" colspan="2">--</td>
                        <td id="defense_sum_reduction" colspan="2">--</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Fighter" class="row my-1 visible_Fighter" style="display: none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">Fighter</div>
                <div class="card-body">
                  <p class=" p-y-1">(Pencil and paper for now)</p>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Priest" class="row my-1 visible_Priest" style="display: none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">Priest</div>
                <div class="card-body">
                  <p class=" p-y-1">(Pencil and paper for now)</p>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Rogue" class="row my-1 visible_Rogue" style="display: none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">Rogue</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-sm m-0">
                        <thead>
                          <tr>
                            <th class="text-center">Prest.</th>
                            <th class="text-center">Stealth</th>
                            <th class="text-center">Mech.</th>
                            <th class="text-center">MD</th>
                            <th class="text-center">SSS</th>
                            <th class="text-center">DN</th>
                            <th class="text-center">Track</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="text-center"><a href="#" id="rogue_prestidigitation" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_stealth" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_mechanical" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_mechanicalDetection" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_scaleSheerSurface" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_detectNoise" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                            <td class="text-center"><a href="#" id="rogue_tracking" class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">40%</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr>
                  <div class="row visible_Rogue" style="display:none;">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-2 text-right font-weight-bold">Hit Bonus:</div>
                        <div class="col-md-2 text-left">+10%</div>
                        <div class="col-md-2 text-right font-weight-bold">Multiplier:</div>
                        <div class="col-md-2 text-left">x2</div>
                        <div class="col-md-2 text-right font-weight-bold">Kill %:</div>
                        <div class="col-md-2 text-left">
                          <a href="#" class="btn btn-sm btn-outline-primary" title="Press to Roll">10%</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="section_Wizard" class="row my-1 visible_Wizard" style="display: none;">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                
                  <div class="row">
                    <div class="col-md-2">Wizard</div>
                    <div class="col-md-2">Casting Level: <span id="wizard_spells_casting_level">---</span></div>
                    <div class="col-md-3"></div>
                    <div class="col-md-2">
                      Learn Spell:
                      <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_learn_spell" value="--%"></button>
                    </div>
                    <div class="col-md-2">
                      Spell Failure:
                      <button class="btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll" id="character_spell_failure" value="--%"></button>
                    </div>
                    <div class="col-md-1">
                      <a href="#" data-toggle="modal" data-target="#wizardSpellModal" data-title="New Spell"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <h5>Slots:</h5>
                      <table class="table table-sm">
                        <thead>
                          <tr class="text-center">
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="text-center">
                            <td id="wizard_spells_slots_0"></td>
                            <td id="wizard_spells_slots_1"></td>
                            <td id="wizard_spells_slots_2"></td>
                            <td id="wizard_spells_slots_3"></td>
                            <td id="wizard_spells_slots_4"></td>
                            <td id="wizard_spells_slots_5"></td>
                            <td id="wizard_spells_slots_6"></td>
                            <td id="wizard_spells_slots_7"></td>
                          </tr>
                          <!-- 
                          <tr class="text-center">
                            <th>Remaining</th>
                            <td class="wizard_spells_remaining_0">0</td>
                            <td class="wizard_spells_remaining_1">1</td>
                            <td class="wizard_spells_remaining_2">2</td>
                            <td class="wizard_spells_remaining_3">3</td>
                            <td class="wizard_spells_remaining_4">4</td>
                            <td class="wizard_spells_remaining_5">5</td>
                            <td class="wizard_spells_remaining_6">6</td>
                            <td class="wizard_spells_remaining_7">7</td>
                          </tr>
                           -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-1">
                      <h5>Spells:</h5>
                    </div>
                    <div class="col-md-11">
                    <input id="wizardSpells_favorite_filter" type="checkbox" checked/> <span>Favorites Only</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-sm">
                        <thead>
                          <tr class="text-center">
                            <th style="width:1px"></th>
                            <th>#</th>
                            <th>Level</th>
                            <th>Name</th>
                            <th>Speed</th>
                            <th>Damage</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody id="wizardSpell_table">
                          <tr id="wizardSpell_template" class="wizardSpell_row text-center">
                            <td>
                              <input id="wizardSpell_favorite_x" class="icon-checkbox wizardSpell_favorite" type="checkbox" />
                              <label for="wizardSpell_favorite_x" class="wizardSpell_favorite_label text-warning">
                                <i class='fa fa-lg fa-star-o unchecked'></i>
                                <i class='fa fa-lg fa-star checked'></i>
                              </label>
                            </td>
                            <td><input class="wizardSpell_memorized text-right" type="text" size="3" maxlength="2" value="0"></input></td>
                            <td class="wizardSpell_level"></td>
                            <td class="wizardSpell_name_cell"><a href="#" class="wizardSpell_name" data-toggle="modal" data-target="#wizardSpellModal" data-title="Edit Wizard Spell"></a></td>
                            <td class="wizardSpell_speed"></td>
                            <td class="wizardSpell_damage"></td>
                            <td class="wizardSpell_notes_cell">
                              <div class="btn-group border border-primary">
                                <button class="btn btn-sm dropdown-toggle btn-link" data-toggle="dropdown">
                                  <i class="fa d-inline fa-lg fa-exclamation-circle"></i>
                                </button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" href="#">
                                    <ul>
                                      <li>School: <span class="wizardSpell_school"></span></li>
                                      <li>Range: <span class="wizardSpell_range"></span></li>
                                      <li>AoE: <span class="wizardSpell_aoe"></span></li>
                                      <li>Duration: <span class="wizardSpell_duration"></span></li>
                                      <li>Components: <span class="wizardSpell_components"></span></li>                                 
                                      <li>Resist: <span class="wizardSpell_resist"></span></li>                                 
                                      <li>Known: <span class="wizardSpell_known"></span></li>                                 
                                      <li>Copied: <span class="wizardSpell_copied"></span></li>                                 
                                    </ul>
                                    Notes:<br><span class="wizardSpell_notes"></span>                           
                                  </a>
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
            <div class="container">
              <p>Coming Soon 2</p>
            </div>
          </div>
        </div>
        <div id="xpShop" class="tab-pane">
        
          <div class="py-0">
            <div class="row my-2">

              <div class="col-md-3">
                <div class="card" style="height: 100%">
                  <div class="card-header">Hit Points</div>
                  <div class="card-body m-0">
                    <table class="table table-sm m-0">
                      <thead>
                        <tr>
                          <th class="text-center"></th>
                          <th class="text-center">XP</th>
                          <th class="text-center">HP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center"><input id="xpShop_hp_0" class="xpBuyInput" type="radio" name="xpShop_hp" value="0" checked="checked" /></td>
                          <td class="text-center">0</td>
                          <td class="text-center">1</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_hp_2" class="xpBuyInput" type="radio" name="xpShop_hp" value="2" /></td>
                          <td class="text-center">2</td>
                          <td class="text-center">3</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_hp_5" class="xpBuyInput" type="radio" name="xpShop_hp" value="5" /></td>
                          <td class="text-center">5</td>
                          <td class="text-center">6</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card">
                  <div class="card-header">Resistances</div>
                  <div class="card-body m-0">
                    <table class="table table-sm m-0">
                      <thead>
                        <tr>
                          <th class="text-center"></th>
                          <th class="text-center">XP</th>
                          <td class="text-center"><select id="xpShop_resist_score1" class="xpBuyInput">
                              <option class="xpShop_resist_agl" value="agility">Agl</option>
                              <option class="xpShop_resist_fot" value="fortitude">Fot</option>
                              <option class="xpShop_resist_wil" value="will">Wil</option>
                              <option class="xpShop_resist_idn" value="identity">Idn</option>
                          </select></td>
                          <td class="text-center"><select id="xpShop_resist_score2" class="xpBuyInput">
                              <option class="xpShop_resist_mit" value="might">Mit</option>
                              <option class="xpShop_resist_agl" value="agility">Agl</option>
                              <option class="xpShop_resist_fot" value="fortitude">Fot</option>
                              <option class="xpShop_resist_wil" value="will">Wil</option>
                              <option class="xpShop_resist_idn" value="identity">Idn</option>
                          </select></td>
                          <td class="text-center"><select id="xpShop_resist_score3" class="xpBuyInput">
                              <option class="xpShop_resist_mit" value="might">Mit</option>
                              <option class="xpShop_resist_agl" value="agility">Agl</option>
                              <option class="xpShop_resist_fot" value="fortitude">Fot</option>
                              <option class="xpShop_resist_wil" value="will">Wil</option>
                              <option class="xpShop_resist_idn" value="identity">Idn</option>
                          </select></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center"><input id="xpShop_resist_0" class="xpBuyInput" type="radio" name="xpShop_resist" value="0" checked="checked" /></td>
                          <td class="text-center">0</td>
                          <td class="text-center">+0%</td>
                          <td class="text-center">+0%</td>
                          <td class="text-center">+0%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_resist_1" class="xpBuyInput" type="radio" name="xpShop_resist" value="1" /></td>
                          <td class="text-center">1</td>
                          <td class="text-center">+2%</td>
                          <td class="text-center">+1%</td>
                          <td class="text-center">+0%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_resist_2" class="xpBuyInput" type="radio" name="xpShop_resist" value="2" /></td>
                          <td class="text-center">2</td>
                          <td class="text-center">+3%</td>
                          <td class="text-center">+2%</td>
                          <td class="text-center">+1%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_resist_3" class="xpBuyInput" type="radio" name="xpShop_resist" value="3" /></td>
                          <td class="text-center">3</td>
                          <td class="text-center">+4%</td>
                          <td class="text-center">+3%</td>
                          <td class="text-center">+2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
            <div class="row my-2">

              <div class="col-md-3">
                <div class="card" style="height: 100%">
                  <div class="card-header">Skill Points</div>
                  <div class="card-body m-0">
                    <table class="table table-sm m-0">
                      <thead>
                        <tr>
                          <th class="text-center"></th>
                          <th class="text-center">XP</th>
                          <th class="text-center">Skill Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center"><input id="xpShop_skill_0" class="xpBuyInput" type="radio" name="xpShop_skill" value="0" checked="checked"></td>
                          <td class="text-center">0</td>
                          <td class="text-center">2</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_skill_1" class="xpBuyInput" type="radio" name="xpShop_skill" value="1" ></td>
                          <td class="text-center">1</td>
                          <td class="text-center">10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="card">
                  <div class="card-header">Weapon Skill Points</div>
                  <div class="card-body m-0">
                    <table class="table table-sm m-0">
                      <thead>
                        <tr>
                          <th class="text-center"></th>
                          <th class="text-center">XP</th>
                          <th class="text-center"><select id="xpShop_weapon_primary" class="xpBuyInput">
                              <option id="xpShop_weapon_primary_MWS" value="MWS">MWS</option>
                              <option id="xpShop_weapon_primary_BWS" value="BWS">BWS</option>
                          </select></th>
                          <th class="text-center" id="xpShop_weapon_secondary">BWS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center"><input id="xpShop_weapon_0" class="xpBuyInput" type="radio" name="xpShop_weapon" value="0" checked="checked"></td>
                          <td class="text-center">0</td>
                          <td class="text-center">+1%</td>
                          <td class="text-center">+0%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_weapon_1" class="xpBuyInput" type="radio" name="xpShop_weapon" value="1"></td>
                          <td class="text-center">1</td>
                          <td class="text-center">+1%</td>
                          <td class="text-center">+1%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_weapon_2" class="xpBuyInput" type="radio" name="xpShop_weapon" value="2"></td>
                          <td class="text-center">2</td>
                          <td class="text-center">+2%</td>
                          <td class="text-center">+1%</td>
                        </tr>
                        <tr>
                          <td class="text-center"><input id="xpShop_weapon_3" class="xpBuyInput" type="radio" name="xpShop_weapon" value="3"></td>
                          <td class="text-center">3</td>
                          <td class="text-center">+3%</td>
                          <td class="text-center">+2%</td>
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
                    <input id="xpShop_class_Fighter" class="xpBuyInput" type="checkbox" /> Fighter - <span id="xpShop_class_cost_Fighter"></span> XP
                  </div>
                  <div class="card-body m-0 visible_Fighter" id="xpShop_class_Fighter_body" style="display: none;">
                    <div class="row my-1">
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Fighter Class Ability
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center"><select id="xpShop_class_fighter_mastery_weapon_1" class="xpBuyInput weaponGroup_select"></select></th>
                              <th class="text-center"><select id="xpShop_class_fighter_mastery_weapon_2" class="xpBuyInput weaponGroup_select"></select></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_fighter_mastery_0" class="xpBuyInput" name="xpShop_class_fighter_mastery" value="0" checked="checked" /></td>
                              <td class="text-center">0</td>
                              <td class="text-center">+0</td>
                              <td class="text-center">+0</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_fighter_mastery_1" class="xpBuyInput" name="xpShop_class_fighter_mastery" value="1" /></td>
                              <td class="text-center">1</td>
                              <td class="text-center">+1</td>
                              <td class="text-center">+0</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_fighter_mastery_2" class="xpBuyInput" name="xpShop_class_fighter_mastery" value="2" /></td>
                              <td class="text-center">2</td>
                              <td class="text-center">+1</td>
                              <td class="text-center">+1</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Fighter Miscellaneous Abilities
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Ability</th>
                              <th class="text-center">Prereq.</th>
                            </tr>
                          </thead>
                          <tbody id="xpShop_class_fighter_misc">
                            <tr id="xpShop_fighter_misc_row_template" style="display: none;">
                              <td class="text-center"><input id="xpShop_fighter_misc_" type="checkbox"></td>
                              <td class="text-center xpShop_fighter_misc_xp">xp</td>
                              <td class="text-center xpShop_fighter_misc_ability">Ability</td>
                              <td class="text-center xpShop_fighter_misc_prereq">None</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-1">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <input id="xpShop_class_Priest" class="xpBuyInput" type="checkbox" /> Priest - <span id="xpShop_class_cost_Priest"></span> XP
                  </div>
                  <div class="card-body m-0 visible_Priest" id="xpShop_class_Priest_body" style="display: none;">
                    <div class="row my-1">
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Priest Class Ability
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Casting Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_priest_spheres_0" name="xpShop_class_priest_spheres" checked="checked" /></td>
                              <td class="text-center">0</td>
                              <td class="text-center">None</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_priest_spheres_2" name="xpShop_class_priest_spheres" /></td>
                              <td class="text-center">2</td>
                              <td class="text-center">+1 to <select></select></td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_priest_spheres_5" name="xpShop_class_priest_spheres" /></td>
                              <td class="text-center">5</td>
                              <td class="text-center">+1 to all spheres</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Priest Miscellaneous Abilities
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Ability</th>
                              <th class="text-center">Prereq.</th>
                            </tr>
                          </thead>
                          <tbody id="xpShop_class_priest_misc">
                            <tr id="xpShop_priest_misc_row_template" style="display: none;">
                              <td class="text-center"><input id="xpShop_priest_misc_" type="checkbox"></td>
                              <td class="text-center xpShop_priest_misc_xp">xp</td>
                              <td class="text-center xpShop_priest_misc_ability">Ability</td>
                              <td class="text-center xpShop_priest_misc_prereq">None</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-1">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <input id="xpShop_class_Rogue" class="xpBuyInput" type="checkbox" /> Rogue - <span id="xpShop_class_cost_Rogue"></span> XP
                  </div>
                  <div class="card-body m-0 visible_Rogue" id="xpShop_class_Rogue_body" style="display: none;">
                    <div class="row my-1">
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Rogue Class Ability
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Rogue Ability Points</th>
                              <th class="text-center">Back Stab Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_rogue_points_0" name="xpShop_class_rogue_points" checked="checked" /></td>
                              <td class="text-center">0</td>
                              <td class="text-center">0</td>
                              <td class="text-center">0</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_rogue_points_1" name="xpShop_class_rogue_points" /></td>
                              <td class="text-center">1</td>
                              <td class="text-center">+3</td>
                              <td class="text-center">+1</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_rogue_points_2" name="xpShop_class_rogue_points" /></td>
                              <td class="text-center">2</td>
                              <td class="text-center">+6</td>
                              <td class="text-center">+1</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_rogue_points_3" name="xpShop_class_rogue_points" /></td>
                              <td class="text-center">3</td>
                              <td class="text-center">+9</td>
                              <td class="text-center">+1</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_rogue_points_4" name="xpShop_class_rogue_points" /></td>
                              <td class="text-center">4</td>
                              <td class="text-center">+12</td>
                              <td class="text-center">+1</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Rogue Miscellaneous Abilities
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Ability</th>
                              <th class="text-center">Prereq.</th>
                            </tr>
                          </thead>
                          <tbody id="xpShop_class_rogue_misc">
                            <tr id="xpShop_rogue_misc_row_template" style="display: none;">
                              <td class="text-center"><input id="xpShop_rogue_misc_" type="checkbox"></td>
                              <td class="text-center xpShop_rogue_misc_xp">xp</td>
                              <td class="text-center xpShop_rogue_misc_ability">Ability</td>
                              <td class="text-center xpShop_rogue_misc_prereq">None</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-1">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <input id="xpShop_class_Wizard" class="xpBuyInput" type="checkbox" /> Wizard - <span id="xpShop_class_cost_Wizard"></span> XP
                  </div>
                  <div class="card-body m-0 visible_Wizard" id="xpShop_class_Wizard_body" style="display: none;">
                    <div class="row my-1">
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Wizard Class Ability
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Casting Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_wizard_casting_level_0" class="xpBuyInput" name="xpShop_class_wizard_casting_level" value="0" checked="checked" /></td>
                              <td class="text-center">0</td>
                              <td class="text-center">None</td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_wizard_casting_level_4" class="xpBuyInput" name="xpShop_class_wizard_casting_level" value="4"/></td>
                              <td class="text-center">4</td>
                              <td class="text-center">+1 to <select id="xpShop_class_wizard_casting_level_school" class="xpBuyInput wizardSchool_select"></select></td>
                            </tr>
                            <tr>
                              <td class="text-center"><input type="radio" id="xpShop_class_wizard_casting_level_8" class="xpBuyInput" name="xpShop_class_wizard_casting_level" value="8"/></td>
                              <td class="text-center">8</td>
                              <td class="text-center">+1 to all schools</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div class="col-md-6">
                        <table class="table table-sm m-0">
                          <thead>
                            <tr>Wizard Miscellaneous Abilities
                            </tr>
                            <tr>
                              <th class="text-center"></th>
                              <th class="text-center">XP</th>
                              <th class="text-center">Ability</th>
                              <th class="text-center">Prereq.</th>
                            </tr>
                          </thead>
                          <tbody id="xpShop_class_wizard_misc">
                            <tr id="xpShop_wizard_misc_row_template" style="display: none;">
                              <td class="text-center"><input id="xpShop_wizard_misc_" type="checkbox"></td>
                              <td class="text-center xpShop_wizard_misc_xp">xp</td>
                              <td class="text-center xpShop_wizard_misc_ability">Ability</td>
                              <td class="text-center xpShop_wizard_misc_prereq">None</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="py-5">
            <div class="row my-1">
              <div class="col-md-12">
                <h3 class="display-5">XP History</h3>
                <table class="table table-sm m-0">
                  <thead>
                    <tr>
                      <th class="text-center">Level</th>
                      <th class="text-center">Points</th>
                      <th class="text-center">Category</th>
                      <th class="text-center">Ability</th>
                    </tr>
                  </thead>
                  <tbody id="xp_history_table">
                    <tr id="xp_history_template" style="display: none">
                      <td class="text-center xp_history_level">--</td>
                      <td class="text-center xp_history_points">--</td>
                      <td class="text-center xp_history_category">--</td>
                      <td class="text-center xp_history_ability">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div id="skillShop" class="tab-pane">
          <div class="py-0">
            <div class="row my-1">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="row">
                      <div class="col-md-11">Weapon Skills</div>
                      <div class="col-md-1">
                        <a href="#" data-toggle="modal" data-target="#weaponSkillModal" data-title="New Attack"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table table-sm">
                      <thead>
                        <tr class="text-center">
                          <th>Weapon Group</th>
                          <th>Spend</th>
                          <th>Total</th>
                          <th>Required</th>
                          <th>Penalty</th>
                        </tr>
                      </thead>
                      <tbody id="weapon_skill_table">
                        <tr id="weapon_skill_template" class="text-center" style="display: none">
                          <td><span class="weapon_skill_weaponGroup">--</span></td>
                          <td><input type="text" class="skillBuyInput weapon_skill_spend text-right" size="4" maxlength="2" value="0"/></td>
                          <td><span class="weapon_skill_total">0</span></td>
                          <td><span class="weapon_skill_required">--</span></td>
                          <td><span class="weapon_skill_penalty">--</span></td>
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
                      <div class="col-md-11">Non-Martial Skills</div>
                      <div class="col-md-1">
                        <a href="#" data-toggle="modal" data-target="#nonMartialSkillModal" data-title="New Skill"><i class="fa fa-plus d-inline fa-lg pull-right"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table table-sm">
                      <thead>
                        <tr class="text-center">
                          <th>Skill</th>
                          <th>Spend</th>
                          <th>Total</th>
                          <th>Formula</th>
                          <th>Check</th>
                        </tr>
                      </thead>
                      <tbody id="nonMartialSkill_table">
                        <tr id="nonMartialSkill_template" class="text-center" style="display:none">
                          <td><a href="#" class="nonMartialSkill_name" data-toggle="modal" data-target="#nonMartialSkillModal" data-title="Edit Skill"></a></td>
                          <td><input type="text" class="skillBuyInput nonMartialSkill_spend text-right" size="4" maxlength="2" value="0"/></td>
                          <td><span class="nonMartialSkill_total">0</span></td>
                          <td><span class="nonMartialSkill_formula">--</span></td>
                          <td><button class="nonMartialSkill_check btn btn-sm btn-outline-primary rollable_d100" title="Press to Roll">0%</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="py-5">
            <div class="row my-1">
              <div class="col-md-12">
                <h3 class="display-5">Skill History</h3>
                <table class="table table-sm m-0">
                  <thead>
                    <tr>
                      <th class="text-center">Level</th>
                      <th class="text-center">Points</th>
                      <th class="text-center">Category</th>
                      <th class="text-center">Ability</th>
                    </tr>
                  </thead>
                  <tbody id="skill_history_table">
                    <tr id="skill_history_template" style="display: none">
                      <td class="text-center skill_history_level">--</td>
                      <td class="text-center skill_history_points">--</td>
                      <td class="text-center skill_history_category">--</td>
                      <td class="text-center skill_history_ability">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>

        <div id="rogueShop" class="tab-pane">
          <div class="py-0">
            <div class="container">Coming Soon</div>
          </div>
        </div>

        <div id="json" class="tab-pane">
          <div class="py-0">
            <div class="container">
              <textarea class="form-control" id="json_text" style="min-height: 600px;"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="attackModal" tabindex="-1" role="dialog" aria-labelledby="attackModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Attack</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <input id="attackModal_index" type="hidden" />
            <div class="row">
              <div class="col-md-4 text-right">Name:</div>
              <div class="col-md-8">
                <input id="attackModal_name" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Base Weapon:</div>
              <div class="col-md-8">
                <select id="attackModal_baseWeapon"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Weapon Skill:</div>
              <div class="col-md-8">
                <label class="radio-inline"><input id="attackModal_weaponSkill_MWS" type="radio" name="attackModal_weaponSkill" value="MWS" checked> MWS</label> <label class="radio-inline"><input id="attackModal_weaponSkill_BWS" type="radio" name="attackModal_weaponSkill" value="BWS">
                  BWS</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Hit:</div>
              <div class="col-md-8">
                <input id="attackModal_hit" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Damage:</div>
              <div class="col-md-8">
                <input id="attackModal_damage" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Speed:</div>
              <div class="col-md-8">
                <input id="attackModal_speed" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Attacks:</div>
              <div class="col-md-8">
                <input id="attackModal_attacks" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Notes:</div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <textarea id="attackModal_notes"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
          <button id="attackModal_save" type="button" class="btn btn-sm btn-primary">Save changes</button>
          <button id="attackModal_delete" type="button" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="defenseModal" tabindex="-1" role="dialog" aria-labelledby="defenseModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Defense</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <input id="defenseModal_index" type="hidden" />
            <div class="row">
              <div class="col-md-4 text-right">Name:</div>
              <div class="col-md-8">
                <input id="defenseModal_name" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Defense Factor:</div>
              <div class="col-md-8">
                <select id="defenseModal_baseDefenseFactor"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Ad:</div>
              <div class="col-md-8">
                <input id="defenseModal_ad" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Ad Mod:</div>
              <div class="col-md-8">
                <input id="defenseModal_adMod" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Aa:</div>
              <div class="col-md-8">
                <input id="defenseModal_aa" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">T:</div>
              <div class="col-md-8">
                <input id="defenseModal_t" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Notes:</div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <textarea id="defenseModal_notes"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
          <button id="defenseModal_save" type="button" class="btn btn-sm btn-primary">Save changes</button>
          <button id="defenseModal_delete" type="button" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="wizardSpellModal" tabindex="-1" role="dialog" aria-labelledby="wizardSpellModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Spell</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <input id="wizardSpellModal_index" type="hidden" />
            <div class="row">
              <div class="col-md-4 text-right">Name:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_name" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Base Spell:</div>
              <div class="col-md-8">
                <select id="wizardSpellModal_baseSpell"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Level:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_level" type="text"type="text" size="3" maxlength="1"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">School:</div>
              <div class="col-md-8">
                <select id="wizardSpellModal_school"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Speed:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_speed" type="text" size="3" maxlength="2"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Damage:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_damage" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Range:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_range" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Area of Effect:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_aoe" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Duration:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_duration" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Components:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_components" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Resist:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_resist" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Known:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_known" type="checkbox"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Copied:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_copied" type="checkbox"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Favorite:</div>
              <div class="col-md-8">
                <input id="wizardSpellModal_favorite" type="checkbox"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Notes:</div>
            </div>
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <textarea id="wizardSpellModal_notes"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
          <button id="wizardSpellModal_save" type="button" class="btn btn-sm btn-primary">Save changes</button>
          <button id="wizardSpellModal_delete" type="button" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="nonMartialSkillModal" tabindex="-1" role="dialog" aria-labelledby="wizardSpellModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Skill</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <input id="nonMartialSkillModal_index" type="hidden" />
            <div class="row">
              <div class="col-md-4 text-right">Name:</div>
              <div class="col-md-8">
                <input id="nonMartialSkillModal_name" type="text"></input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Base Skill:</div>
              <div class="col-md-8">
                <select id="nonMartialSkillModal_baseSkill"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 text-right">Formula:</div>
              <div class="col-md-8">
                <input id="nonMartialSkillModal_formula" type="text"type="text" size="20" maxlength="50"></input>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
          <button id="nonMartialSkillModal_save" type="button" class="btn btn-sm btn-primary">Save changes</button>
          <button id="nonMartialSkillModal_delete" type="button" class="btn btn-sm btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="weaponSkillModal" tabindex="-1" role="dialog" aria-labelledby="weaponSkillModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="weaponSkillModalLabel">Add Weapon Skill</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4 text-right">Weapon Skill:</div>
              <div class="col-md-8">
                <select id="weaponSkillModal_weaponGroup" class="weaponGroup_select"></select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
          <button id="weaponSkillModal_add" type="button" class="btn btn-sm btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
<!-- 
           <h5 class="modal-title">Alert</h5>
 -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="alertModal_content" class="container-fluid">
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
  <script src="../js/dice-roller.js"></script>
  <script src="../js/claymore_common.js"></script>
  <script src="../js/claymore_data.js"></script>
  <script src="../js/claymore_xpbuy.js"></script>
  <script src="../js/claymore_skillbuy.js"></script>
  <script src="../js/claymore_roguebuy.js"></script>
  <script src="../js/claymore_attack.js"></script>
  <script src="../js/claymore_defense.js"></script>
  <script src="../js/claymore_wizardSpell.js"></script>
  <script src="../js/claymore_nonMartialSkills.js"></script>
  <script src="../js/claymore.js"></script>
  <!-- 
   <pingendo onclick="window.open('https://pingendo.com/', '_blank')" style="cursor:pointer;position: fixed;bottom: 10px;right:10px;padding:4px;background-color: #00b0eb;border-radius: 8px; width:110px;display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:14px;color:white">made with&nbsp;&nbsp;
    <img src="https://pingendo.com/site-assets/Pingendo_logo_big.png" class="d-block" alt="Pingendo logo" height="16">
  </pingendo>
 -->
</body>

</html>