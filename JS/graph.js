const margin = { top: 40, right: 20, bottom: 50, left: 100 }
const marginInline = margin.left + margin.right
const marginBlock = margin.top + margin.bottom
const graphWidth = 560 - marginInline
const graphHeight = 400 - marginBlock

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', graphWidth + marginInline)
    .attr('height', graphHeight + marginBlock)

const graph = svg.append('g') // g means group
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

// scales
const x = d3.scaleTime().range([0, graphWidth])
const y = d3.scaleLinear().range([graphHeight, 0])

//axis groups
const xAxisGroup = graph.append('g')
    .attr('class', 'x-axis')
    .attr('transform', "translate(0, " + graphHeight + ")")

const yAxisGroup = graph.append('g')
    .attr('class', 'y-axis')

const update = (data) => {
    //console.log(data)

    //set scale domains
    x.domain(d3.extent(data, d => new Date(d.date)))
    y.domain([0, d3.max(data, d => d.distance)])

    //create axis
    const xAxis = d3.axisBottom(x)
        .ticks(4)
        .tickFormat(d3.timeFormat('%b %d'))
    
    const yAxis = d3.axisLeft(y)
        .ticks(4)
        .tickFormat(d => d + ' mi')

    // call axis - (call method creates axis's and places them in the mentioned group)
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    //rotate axis text
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
}

// data and firestore	
var data = [];

db.collection('activities').orderBy('date').onSnapshot(res => {
    res.docChanges().forEach(change => {

        const doc = {...change.doc.data(), id: change.doc.id
        }

        switch (change.type) {
            case 'added':
                data.push(doc)
                break;
            case 'modified':
                const index = data.findIndex(item => item.id == doc.id);
                data[index] = doc
                break;
            case 'removed':
                data = data.filter(item => item.id !== doc.id)
                break;
            default:
                break;
        }
    })

    update(data)

})

