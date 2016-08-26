SetupTable = function(){
    (function() { // THIS FUNCTION IS REQUIRED.
        if(/Firefox|MSIE |Trident/i.test(navigator.userAgent))
            var formatForPrint = function(table) {
                var noBreak = document.createElement("div")
                    , noBreakTable = noBreak.appendChild(document.createElement("div")).appendChild(table.cloneNode())
                    , tableParent = table.parentNode
                    , tableParts = table.children
                    , partCount = tableParts.length
                    , partNum = 0
                    , cell = table.querySelector("tbody > tr > td");
                noBreak.className = "noBreak";
                for(; partNum < partCount; partNum++) {
                    if(!/tbody/i.test(tableParts[partNum].tagName))
                        noBreakTable.appendChild(tableParts[partNum].cloneNode(true));
                }
                if(cell) {
                    noBreakTable.appendChild(cell.parentNode.parentNode.cloneNode()).appendChild(cell.parentNode.cloneNode(true));
                    if(!table.tHead) {
                        var borderRow = document.createElement("tr");
                        borderRow.appendChild(document.createElement("th")).colSpan="1000";
                        borderRow.className = "borderRow";
                        table.insertBefore(document.createElement("thead"), table.tBodies[0]).appendChild(borderRow);
                    }
                }
                tableParent.insertBefore(document.createElement("div"), table).style.paddingTop = ".009px";
                tableParent.insertBefore(noBreak, table);
            };
        else
            var formatForPrint = function(table) {
                var tableParent = table.parentNode
                    , cell = table.querySelector("tbody > tr > td");
                if(cell) {
                    var topFauxRow = document.createElement("table")
                        , fauxRowTable = topFauxRow.insertRow(0).insertCell(0).appendChild(table.cloneNode())
                        , colgroup = fauxRowTable.appendChild(document.createElement("colgroup"))
                        , headerHider = document.createElement("div")
                        , metricsRow = document.createElement("tr")
                        , cells = cell.parentNode.cells
                        , cellNum = cells.length
                        , colCount = 0
                        , tbods = table.tBodies
                        , tbodCount = tbods.length
                        , tbodNum = 0
                        , tbod = tbods[0];
                    for(; cellNum--; colCount += cells[cellNum].colSpan);
                    for(cellNum = colCount; cellNum--; metricsRow.appendChild(document.createElement("td")).style.padding = 0);
                    cells = metricsRow.cells;
                    tbod.insertBefore(metricsRow, tbod.firstChild);
                    for(; ++cellNum < colCount; colgroup.appendChild(document.createElement("col")).style.width = cells[cellNum].offsetWidth + "px");
                    var borderWidth = metricsRow.offsetHeight;
                    metricsRow.className = "metricsRow";
                    borderWidth -= metricsRow.offsetHeight;
                    tbod.removeChild(metricsRow);
                    tableParent.insertBefore(topFauxRow, table).className = "fauxRow";
                    if(table.tHead)
                        fauxRowTable.appendChild(table.tHead);
                    var fauxRow = topFauxRow.cloneNode(true)
                        , fauxRowCell = fauxRow.rows[0].cells[0];
                    fauxRowCell.insertBefore(headerHider, fauxRowCell.firstChild).style.marginBottom = -fauxRowTable.offsetHeight - borderWidth + "px";
                    if(table.caption)
                        fauxRowTable.insertBefore(table.caption, fauxRowTable.firstChild);
                    if(tbod.rows[0])
                        fauxRowTable.appendChild(tbod.cloneNode()).appendChild(tbod.rows[0]);
                    for(; tbodNum < tbodCount; tbodNum++) {
                        tbod = tbods[tbodNum];
                        rows = tbod.rows;
                        for(; rows[0]; tableParent.insertBefore(fauxRow.cloneNode(true), table).rows[0].cells[0].children[1].appendChild(tbod.cloneNode()).appendChild(rows[0]));
                    }
                    tableParent.removeChild(table);
                }
                else
                    tableParent.insertBefore(document.createElement("div"), table).appendChild(table).parentNode.className="fauxRow";
            };
        var tables = document.body.querySelectorAll("table.print")
            , tableNum = tables.length;
        for(; tableNum--; formatForPrint(tables[tableNum]));
    })();
}