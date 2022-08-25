var roleSoldier = {

    /** @param {Creep} creep **/
   run: function(creep) {   
       
	        var MoveToRaid = Game.flags.MoveToRaid;
	        var Move = Game.flags.Move;
	        var MoveSoldiers = Game.flags.MoveSoldiers;
	        var MoveGroup = Game.flags.MoveGroup;
	        var CreateSoldiers1 = Game.flags.CreateSoldiers1;
	        var AttackTarget = Game.flags.AttackTarget;
	        var targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{
                filter: function(object) {
                    return object.getActiveBodyparts(ATTACK) > 0 || object.getActiveBodyparts(RANGED_ATTACK) > 0;
                }
            });
	        var targetStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES); 
	        var rangesCreep = creep.pos.getRangeTo(targetCreep);
	        var rangesStructure = creep.pos.getRangeTo(targetStructure);
	        var rangesAttack = creep.pos.getRangeTo(AttackTarget);
	        var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
	        console.log(targets.length);
	       
	        // ÃÂÃÂ¢ÃÂÃÂ¾ÃÂÃÂÃÂÃÂºÃÂÃÂ° ÃÂÃÂÃÂÃÂ±ÃÂÃÂ¾ÃÂÃÂÃÂÃÂ° ÃÂÃÂ¿ÃÂÃÂÃÂÃÂ¸ ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ·ÃÂÃÂ´ÃÂÃÂ°ÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ¸
	        
	        if (CreateSoldiers1) {
	            creep.moveTo(CreateSoldiers1);
	        }
	        
	        // ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂºÃÂÃÂ° ÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂÃÂÃÂµÃÂÃÂºÃÂÃÂÃÂÃÂ° ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ´ ÃÂÃÂÃÂÃÂ»ÃÂÃÂ°ÃÂÃÂ³ÃÂÃÂ¾ÃÂÃÂ¼
	        
	        
	        
    function SoldiersCreep() {
    
	        creep.heal(creep);
	        
            if (AttackTarget) {
                
                var PosFlag = Game.flags.AttackTarget.pos;
                var PosCreep = creep.pos.roomName;
                var Look = creep.room.lookAt(PosFlag);
                
                //(Look[i].type == 'creep') &&

                if (rangesAttack > 3) {
                    creep.moveTo(AttackTarget);
                } else if (rangesAttack <= 3) {
                    var targets =_.filter(Look,o => o.type == 'structure' || o.type == 'creep' ); 
                 
                    if (targets.length > 0) {
                        creep.rangedAttack(targets[0].structure || targets[0].creep);
                    } else if (targets.length == 0) {
                        Game.flags.AttackTarget.remove();
                        Game.notify('ÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ ÃÂÃÂÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂ¶ÃÂÃÂ¸ÃÂÃÂ»ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂµÃÂÃÂ»ÃÂÃÂ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+PosCreep, 0);
                    }
                }
            }

            var Defend = Game.flags.Defend;

            if (Defend) {
                if (creep.pos.getRangeTo(Defend) > 10) {
                    creep.travelTo(Defend);
                } else if (creep.pos.getRangeTo(Defend) <= 10) {
                    if (targetCreep) {
                        if(creep.rangedAttack(targetCreep) == ERR_NOT_IN_RANGE) {
                            creep.travelTo(targetCreep, {visualizePathStyle: {stroke: '#FF0000', opacity: 0.5,}});
                        } else if(creep.attack(targetCreep) == ERR_NOT_IN_RANGE) {
                            creep.travelTo(targetCreep, {visualizePathStyle: {stroke: '#FF0000', opacity: 0.5,}});
                        }
                    } else {
                        creep.travelTo(Defend);
                    }
                }
            }
            
            // ÃÂÃÂÃÂÃÂ´ÃÂÃÂÃÂÃÂ¸ ÃÂÃÂ½ÃÂÃÂ° ÃÂÃÂÃÂÃÂµÃÂÃÂ¹ÃÂÃÂ´
            
            if (MoveToRaid && !CreateSoldiers1) {
                
            //creep.moveTo(FIND_HOSTILE_CREEPS);
            
            var PosFlag = Game.flags.MoveToRaid.pos.roomName;
            var PosCreep = creep.pos.roomName;
            
                if (PosFlag !== PosCreep) {
                    creep.moveTo(MoveToRaid);
                } else if (PosFlag == PosCreep) {
                    if((!targetCreep) && (!targetStructure)) {
                       Game.notify('ÃÂÃÂ ÃÂÃÂµÃÂÃÂ¹ÃÂÃÂ´ ÃÂÃÂ² ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂµ '+PosCreep+' ÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂ²ÃÂÃÂµÃÂÃÂÃÂÃÂÃÂÃÂµÃÂÃÂ½. ÃÂÃÂÃÂÃÂÃÂÃÂ°ÃÂÃÂ¶ÃÂÃÂµÃÂÃÂÃÂÃÂºÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂºÃÂÃÂÃÂÃÂ¸ÃÂÃÂ¿ÃÂÃÂ¾ÃÂÃÂ² ÃÂÃÂ¸ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¾ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¸ÃÂÃÂ¹ ÃÂÃÂ½ÃÂÃÂµ ÃÂÃÂ¾ÃÂÃÂ±ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂ¶ÃÂÃÂµÃÂÃÂ½ÃÂÃÂ¾', 0);
                       Game.flags.MoveToRaid.remove();
                    } 
                }
                
                
                
            }
            
            // ÃÂÃÂÃÂÃÂ²ÃÂÃÂÃÂÃÂ¾ÃÂÃÂ½ÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂÃÂÃÂµ ÃÂÃÂ´ÃÂÃÂµÃÂÃÂ¹ÃÂÃÂÃÂÃÂÃÂÃÂ²ÃÂÃÂ¸ÃÂÃÂ
            
            if (!AttackTarget && !CreateSoldiers1 && !Defend) {
                if (targetCreep){
                   
                        if(rangesCreep <= 3) {
                        creep.rangedAttack(targetCreep);
                        }
                        if(rangesCreep > 3) {
                        creep.moveTo(targetCreep);
                        }
                        
                }else if (targetStructure) {
                     
                        if(rangesStructure <= 3) {
                        creep.rangedAttack(targetStructure);
                        }
                        if(rangesStructure > 3) {
                        creep.moveTo(targetStructure);
                        }
                        
                }
            
                
            }
            
            // ÃÂÃÂÃÂÃÂ´ÃÂÃÂÃÂÃÂ¸ ÃÂÃÂ½ÃÂÃÂ° ÃÂÃÂÃÂÃÂ»ÃÂÃÂ°ÃÂÃÂ³ÃÂÃÂ¸ 
            
            if (Move) {
                creep.moveTo(Move);
            }
            if (MoveSoldiers) {
                creep.moveTo(MoveSoldiers);
            }
            if (MoveGroup) {
                creep.moveTo(MoveGroup);
            }
            
            
    }    
            
            
        //----------------------------------------------------------------
        
        var MassPath = [];  // 'W85N19' ÃÂÃÂÃÂÃÂ°ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¸ÃÂÃÂ·ÃÂÃÂ°ÃÂÃÂÃÂÃÂ¸ÃÂÃÂ ÃÂÃÂ¿ÃÂÃÂ¾ ÃÂÃÂºÃÂÃÂ¾ÃÂÃÂ¼ÃÂÃÂ½ÃÂÃÂ°ÃÂÃÂÃÂÃÂ°ÃÂÃÂ¼ 
        
        //----------------------------------------------------------------
        
        var PosCreep = creep.pos.roomName;

       
        if (MassPath.length == 0) {
            SoldiersCreep()
        } else if (MassPath.length > 0) {
            if (creep.memory.target === undefined) {
                creep.memory.target = '!achieved';
                creep.memory.point = 0; 
            }
            
            if ((creep.memory.target == '!achieved') && (creep.memory.point < MassPath.length)) {
                for (var i=0;i < MassPath.length;i++) {
                    if (creep.memory.point == i) {
                        if (PosCreep !== MassPath[i]) {
                            creep.moveTo(new RoomPosition(25, 25, MassPath[i]));
                        } else if (PosCreep == MassPath[i]) {
                            creep.memory.point = creep.memory.point + 1;
                        }
                    }
                }
            } 
            
            
            if (creep.memory.point == MassPath.length) {
                SoldiersCreep();
            }
            
            
        }
            
            // ÃÂÃÂÃÂÃÂ´ÃÂÃÂÃÂÃÂ¸ ÃÂÃÂ½ÃÂÃÂ° ÃÂÃÂÃÂÃÂ»ÃÂÃÂ°ÃÂÃÂ³
            

            var CreateSoldiers1 = Game.flags.CreateSoldiers1;
            if (CreateSoldiers1) {
                creep.moveTo(CreateSoldiers1);
            }
        }
    }

module.exports = roleSoldier;