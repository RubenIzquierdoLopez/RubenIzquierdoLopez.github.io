import numpy as np
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection
from matplotlib.colors import LinearSegmentedColormap

def generate_thicker_thinner_serpent(output_file="serpent_thick_thin.png"):
    fig, ax = plt.subplots(figsize=(16, 9), dpi=300)
    
    bg_color = '#000b1e' 
    fig.patch.set_facecolor(bg_color)
    ax.set_facecolor(bg_color)

    # --- Geometry Parameters ---
    n_longitudinal = 50   # More lines to fill the increased width cleanly
    n_transversal = 60    
    points_per_line = 600 
    serpent_width = 0.45  # Increased width for a thicker serpent
    
    y_spine = np.linspace(0, 1, points_per_line)
    # Adjusted x_spine center slightly for the new width
    x_spine = 0.3 * np.sin(2 * np.pi * y_spine) + 0.77

    # --- 1. Longitudinal Lines (Lengthwise) ---
    offsets = np.linspace(-serpent_width, serpent_width, n_longitudinal)
    
    for off in offsets:
        x_line = x_spine + off
        side_shading = (1.0 - (abs(off) / serpent_width)) ** 2.0 
        # Thinner lines
        ax.plot(x_line, y_spine, color='#4a9eff', alpha=side_shading * 0.7, lw=0.4, zorder=1)

    # --- 2. Transversal Lines (The Ribs) ---
    cmap_data = {
        'red':   [[0.0, 0.0, 0.0], [0.5, 0.0, 0.0], [1.0, 0.0, 0.0]],
        'green': [[0.0, 0.83, 0.83], [0.5, 0.83, 0.83], [1.0, 0.83, 0.83]],
        'blue':  [[0.0, 1.0, 1.0], [0.5, 1.0, 1.0], [1.0, 1.0, 1.0]],
        'alpha': [[0.0, 0.0, 0.0], [0.5, 0.5, 0.5], [1.0, 0.0, 0.0]] 
    }
    rib_cmap = LinearSegmentedColormap('rib_fade', cmap_data)

    rib_indices = np.linspace(0, points_per_line - 1, n_transversal, dtype=int)
    for idx in rib_indices:
        y_val = y_spine[idx]
        x_center = x_spine[idx]
        
        x_rib = np.linspace(x_center - serpent_width, x_center + serpent_width, 100)
        y_rib = np.full_like(x_rib, y_val)
        
        points = np.array([x_rib, y_rib]).T.reshape(-1, 1, 2)
        segments = np.concatenate([points[:-1], points[1:]], axis=1)
        
        lc = LineCollection(segments, cmap=rib_cmap, linewidth=0.6, zorder=2) # Thinner ribs
        lc.set_array(np.linspace(0, 1, len(x_rib)))
        ax.add_collection(lc)

    # Styling
    ax.set_xlim(0, 1.6) 
    ax.set_ylim(0, 1)   
    ax.axis('off')

    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    plt.savefig(output_file, facecolor=bg_color, bbox_inches='tight', pad_inches=0)
    plt.show()

if __name__ == "__main__":
    generate_thicker_thinner_serpent()