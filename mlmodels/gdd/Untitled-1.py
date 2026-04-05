# %%
VARIETIES = {
	"Red Delicious": {
		"chill_target": 1000, "t_base": 4.0,
		"gdd_stages": [("Bud break",120),("Pre-bloom",300),("Bloom",400),
					   ("Fruit set",750),("Fruit growth",1200),("Harvest",1500)],
		"potential_yield": 20.0
	},
	"Royal Delicious": {
		"chill_target": 1000, "t_base": 4.0,
		"gdd_stages": [("Bud break",120),("Pre-bloom",300),("Bloom",400),
					   ("Fruit set",750),("Fruit growth",1200),("Harvest",1500)],
		"potential_yield": 20.0
	},
	"Golden Delicious": {
		"chill_target": 1350, "t_base": 4.0,
		"gdd_stages": [("Bud break",150),("Pre-bloom",350),("Bloom",450),
					   ("Fruit set",800),("Fruit growth",1250),("Harvest",1500)],
		"potential_yield": 25.0
	},
	"Ambri": {
		"chill_target": 900, "t_base": 4.0,
		"gdd_stages": [("Bud break",100),("Pre-bloom",250),("Bloom",350),
					   ("Fruit set",700),("Fruit growth",1200),("Harvest",1400)],
		"potential_yield": 15.0
	},
	"Maharaji": {
		"chill_target": 950, "t_base": 4.0,
		"gdd_stages": [("Bud break",110),("Pre-bloom",260),("Bloom",360),
					   ("Fruit set",720),("Fruit growth",1250),("Harvest",1450)],
		"potential_yield": 18.0
	},
	"Tydeman's Early": {
		"chill_target": 700, "t_base": 4.0,
		"gdd_stages": [("Bud break",80),("Pre-bloom",200),("Bloom",300),
					   ("Fruit set",600),("Fruit growth",1100),("Harvest",1300)],
		"potential_yield": 18.0
	},
	"Anna": {
		"chill_target": 400, "t_base": 4.0,
		"gdd_stages": [("Bud break",50),("Pre-bloom",150),("Bloom",250),
					   ("Fruit set",500),("Fruit growth",900),("Harvest",1200)],
		"potential_yield": 15.0
	},
	"Granny Smith": {
		"chill_target": 700, "t_base": 4.0,
		"gdd_stages": [("Bud break",80),("Pre-bloom",200),("Bloom",300),
					   ("Fruit set",600),("Fruit growth",1100),("Harvest",1300)],
		"potential_yield": 20.0
	},
	"Fuji": {
		"chill_target": 850, "t_base": 4.0,
		"gdd_stages": [("Bud break",90),("Pre-bloom",220),("Bloom",320),
					   ("Fruit set",650),("Fruit growth",1150),("Harvest",1350)],
		"potential_yield": 20.0
	},
	"Gala": {
		"chill_target": 700, "t_base": 4.0,
		"gdd_stages": [("Bud break",80),("Pre-bloom",200),("Bloom",300),
					   ("Fruit set",600),("Fruit growth",1100),("Harvest",1300)],
		"potential_yield": 18.0
	}
}

SOIL_PRESETS = {
	"Loamy": 1.0,        
	"Clay": 0.9,         
	"Sandy": 0.85,       
	"Silty": 0.95,       
	"Peaty": 0.92
}

def accumulate_chill_daily(tmin, tmax, chill_threshold=7.0):
	"""
	Simplified chill accumulation:
	If average temp < threshold, count full day as chill hours (24).
	Otherwise, no accumulation.
	"""
	tavg = (tmin + tmax) / 2
	return 24 if tavg < chill_threshold else 0

def calc_daily_gdd(tmin, tmax, tbase):
	"""
	Calculate daily Growing Degree Days (GDD).
	Formula: max(0, ((tmax+tmin)/2 - tbase))
	"""
	tavg = (tmin + tmax) / 2
	return max(0.0, tavg - tbase)

def update_stage(cum_gdd, gdd_stages, dormancy_completed, current_stage):
	"""
	Determine current phenological stage.
	- If dormancy is not completed → always "Dormancy".
	- If dormancy just completed and cum_gdd = 0 → keep "Bud break".
	- Otherwise progress through GDD stages.
	"""
	if not dormancy_completed:
		return "Dormancy"

	stage = current_stage if current_stage != "Dormancy" else "Bud break"

	for name, threshold in gdd_stages:
		if cum_gdd >= threshold:
			stage = name
		else:
			break
	return stage

def process_tree(variety_name, soil_preset, daily_weather, initial_state=None):
	cfg = VARIETIES[variety_name]
	soil_factor = SOIL_PRESETS.get(soil_preset, 1.0)

	if initial_state is None:
		state = {
			"chill_hours": 0.0, "endodormancy_completed": False,
			"cum_gdd": 0.0, "stage": "Dormancy",
			"pause_days": 0, "flower_survival": 1.0,
			"size_factor": 1.0, "quality_factor": 1.0
		}
	else:
		
		state = initial_state.copy()

	
	daily_log = []
	for day in daily_weather:
		tmin, tmax = day["tmin"], day["tmax"]
		
		
		if not state["endodormancy_completed"]:
			ch = accumulate_chill_daily(tmin, tmax, 7.0)
			state["chill_hours"] += ch
			if state["chill_hours"] >= cfg["chill_target"]:
				state["endodormancy_completed"] = True
				state["stage"] = "Bud break"
			daily_log.append({
				"date": day["date"], "stage": state["stage"],
				"chill_hours": state["chill_hours"]
			})
			continue
		
		
		daily_gdd = calc_daily_gdd(tmin, tmax, cfg["t_base"])
		if daily_gdd <= 0.0:
			state["pause_days"] += 1
		else:
			state["pause_days"] = 0
			
			if tmax > 35.0:
				heat_penalty = min(0.9, (tmax - 35.0) * 0.05)
				daily_gdd *= (1 - heat_penalty)
				state["size_factor"] *= (1 - heat_penalty * 0.5)
			state["cum_gdd"] += daily_gdd
		
		
		state["stage"] = update_stage(
		state["cum_gdd"], 
		cfg["gdd_stages"], 
		state["endodormancy_completed"], 
		state["stage"]
		)

		
		
		if state["stage"] in ("Bloom","Fruit set") and tmin <= 0.0:
			state["flower_survival"] *= 0.75
			state["quality_factor"] *= 0.95
		
		daily_log.append({
			"date": day["date"], "tmin": tmin, "tmax": tmax, "daily_gdd": daily_gdd,
			"cum_gdd": state["cum_gdd"], "stage": state["stage"],
			"flower_survival": state["flower_survival"], "size_factor": state["size_factor"]
		})
	
	
	tree_yield = (
		cfg["potential_yield"] *
		state["flower_survival"] *
		state["size_factor"] *
		state["quality_factor"] *
		soil_factor
	)
	
	return {"state": state, "daily_log": daily_log, "tree_yield": tree_yield}


