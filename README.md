# Progressbar

Dependency for creating progressbars in QB-Core.

# Usage

## QB-Core Functions

### Client

- QBCore.Functions.Progressbar(**name**: string, **label**: string, **duration**: number, **useWhileDead**: boolean, **canCancel**: boolean, **disableControls**: table, **animation**: table, **prop**: table, **propTwo**: table, **onFinish**: function, **onCancel**: function)
  > Create a new progressbar from the built in qb-core functions.<br>
  > **Example:**
  > ```lua
  >QBCore.Functions.Progressbar("random_task", "Doing something", 5000, false, true, {
  >    disableMovement = false,
  >    disableCarMovement = false,
  >    disableMouse = false,
  >    disableCombat = true,
  >}, {
  >    animDict = "mp_suicide",
  >    anim = "pill",
  >    flags = 49,
  >}, {}, {}, function() -- Done
  >    StopAnimTask(PlayerPedId(), "mp_suicide", "pill", 1.0)
  >end, function() -- Cancel
  >    StopAnimTask(PlayerPedId(), "mp_suicide", "pill", 1.0)
  >end)
  > ```

## Exports

### Client

- Progress(**data**: string, **handler**: function)
  > Creates a new progress bar directly from the export, always use the built in qb-core function if possible.<br>
  > **Example:**
  > ```lua
  >exports['progressbar']:Progress({
  >    name = "random_task",
  >    duration = 5000,
  >    label = "Doing something",
  >    useWhileDead = false,
  >    canCancel = true,
  >    controlDisables = {
  >        disableMovement = false,
  >        disableCarMovement = false,
  >        disableMouse = false,
  >        disableCombat = true,    
  >    },
  >    animation = {
  >        animDict = "mp_suicide",
  >        anim = "pill",
  >        flags = 49,
  >    },
  >    prop = {},
  >    propTwo = {}
  >}, function(cancelled)
  >    if not cancelled then
  >        -- finished
  >    else
  >        -- cancelled
  >    end
  >end)
  > ```

  - isDoingSomething()
    > Returns a boolean (true/false) depending on if a progressbar is present.<br>
    > **Example:**
    > ```lua
    > local busy = exports["progressbar"]:isDoingSomething()
    > ```

  - ProgressWithStartEvent(**data**: table, **start**: function, **finish**: function)
    > Works like a normal progressbar, the data parameter should be the same as the data passed into the `Progress` export above.<br>
    > The start function gets triggered upon the start of the progressbar.<br>
    > The finish handler is the same as the `handler` parameter in the `Progress` export above. 

  - ProgressWithTickEvent(**data**: table, **tick**: function, **finish**: function)
    > Works like a normal progressbar, the data parameter should be the same as the data passed into the `Progress` export above.<br>
    > The tick function gets triggered every frame while the progressbar is active.<br>
    > The finish handler is the same as the `handler` parameter in the `Progress` export above. 

  - ProgressWithTickEvent(**data**: table, **start**: function, **tick**: function, **finish**: function)
    > Works like a normal progressbar, the data parameter should be the same as the data passed into the `Progress` export above.<br>
    > The start function gets triggered upon the start of the progressbar.<br>
    > The tick function gets triggered every frame while the progressbar is active.<br>
    > The finish handler is the same as the `handler` parameter in the `Progress` export above. 
