from api.coronavirus.resource import Covid, CovidByCountie
from api.wildfire.resource import FireList, FireByCountie, FireByName

def initialize_routes(api):
    api.add_resource(Covid, '/coronavirus/counties')
    api.add_resource(CovidByCountie, '/coronavirus/countie/<string:countie>')
    api.add_resource(FireList, '/wildfire/counties')
    api.add_resource(FireByName, '/wildfire/firename/<string:name>')
    api.add_resource(FireByCountie, '/wildfire/countie/<string:countie>')