#!/bin/bash
# Full comparison test suite

echo "========================================================================"
echo "COMPLETE GALE-SHAPLEY VS SPA COMPARISON TEST SUITE"
echo "========================================================================"
echo ""

echo "1. Testing basic simulation (small population)..."
python3 matching_simulation.py --population 200 --cycles 10 --k 15 --correlation 0.3
if [ $? -ne 0 ]; then
    echo "ERROR: Basic simulation failed"
    exit 1
fi
echo ""

echo "2. Testing with heterogeneous preferences (low correlation)..."
python3 matching_simulation.py --population 200 --cycles 10 --k 15 --correlation 0.1 > /tmp/test_hetero.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Heterogeneous preference simulation failed"
    exit 1
fi
echo "✓ Success - output saved to /tmp/test_hetero.txt"
echo ""

echo "3. Testing with homogeneous preferences (high correlation)..."
python3 matching_simulation.py --population 200 --cycles 10 --k 15 --correlation 0.7 > /tmp/test_homo.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Homogeneous preference simulation failed"
    exit 1
fi
echo "✓ Success - output saved to /tmp/test_homo.txt"
echo ""

echo "4. Testing dynamics visualization..."
python3 visualize_results.py --population 200 --cycles 10 > /tmp/test_viz.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Visualization failed"
    exit 1
fi
echo "✓ Success - output saved to /tmp/test_viz.txt"
echo ""

echo "5. Testing parameter sweep (this may take a minute)..."
timeout 120 python3 visualize_results.py --sweep > /tmp/test_sweep.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Parameter sweep failed or timed out"
    exit 1
fi
echo "✓ Success - output saved to /tmp/test_sweep.txt"
echo ""

echo "========================================================================"
echo "ALL TESTS PASSED ✓"
echo "========================================================================"
echo ""
echo "Key files created:"
echo "  - gale-shapley-spa-comparison.md (46KB theoretical comparison)"
echo "  - matching_simulation.py (simulation implementation)"
echo "  - visualize_results.py (analysis tools)"
echo "  - SIMULATION_README.md (usage guide)"
echo "  - IMPLEMENTATION_SUMMARY.md (deliverables summary)"
echo ""
echo "Run individual simulations with:"
echo "  python3 matching_simulation.py --population N --cycles C --k K"
echo ""
echo "Run analysis with:"
echo "  python3 visualize_results.py --sweep"
echo ""
